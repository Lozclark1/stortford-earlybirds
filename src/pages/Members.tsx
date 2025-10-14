import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Heart, Image as ImageIcon, MessageSquare, Upload, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const Members = () => {
  const [memberName, setMemberName] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalPhotos: 0,
    totalLikes: 0,
    activeMembers: 0,
    totalComments: 0,
  });
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPhotos();
    fetchStats();
  }, []);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from("member_photos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching photos:", error);
    } else {
      setPhotos(data || []);
    }
  };

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from("member_photos")
      .select("likes, member_name");

    if (error) {
      console.error("Error fetching stats:", error);
    } else {
      const totalPhotos = data?.length || 0;
      const totalLikes = data?.reduce((sum, photo) => sum + (photo.likes || 0), 0) || 0;
      const uniqueMembers = new Set(data?.map((photo) => photo.member_name)).size;
      
      setStats({
        totalPhotos,
        totalLikes,
        activeMembers: uniqueMembers,
        totalComments: 0,
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!memberName || !caption || !selectedFile) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a photo",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload file to storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("member-photos")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("member-photos")
        .getPublicUrl(fileName);

      // Insert record into database
      const { error: insertError } = await supabase
        .from("member_photos")
        .insert({
          member_name: memberName,
          caption: caption,
          photo_url: urlData.publicUrl,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Your photo has been uploaded",
      });

      // Reset form
      setMemberName("");
      setCaption("");
      setSelectedFile(null);
      
      // Refresh data
      fetchPhotos();
      fetchStats();
    } catch (error) {
      console.error("Error uploading:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your photo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleLike = async (photoId: string, currentLikes: number) => {
    const { error } = await supabase
      .from("member_photos")
      .update({ likes: currentLikes + 1 })
      .eq("id", photoId);

    if (error) {
      console.error("Error updating likes:", error);
    } else {
      fetchPhotos();
      fetchStats();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Members Gallery</h1>
            <p className="text-xl">Share your cycling adventures with fellow group members. Upload photos from your rides, events, and cycling experiences.</p>
          </div>
        </section>
        
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-6 w-6 text-primary" />
                  <CardTitle>Upload Your Photo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="caption">Photo Caption</Label>
                    <Input
                      id="caption"
                      placeholder="Describe your photo"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <Upload className="h-4 w-4" />
                      Choose Photo to Upload
                    </Label>
                    {selectedFile && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="shadow-glow"
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-6 text-center">Gallery Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6 text-center">
                  <ImageIcon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold">{stats.totalPhotos}</div>
                  <div className="text-sm text-muted-foreground">Photos Shared</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold">{stats.totalLikes}</div>
                  <div className="text-sm text-muted-foreground">Total Likes</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold">{stats.activeMembers}</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold">{stats.totalComments}</div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={photo.photo_url}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-medium mb-2">{photo.caption}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div>
                        <p>by {photo.member_name}</p>
                        <p>{format(new Date(photo.created_at), "M/d/yyyy")}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(photo.id, photo.likes)}
                        className="flex items-center gap-1"
                      >
                        <Heart className="h-4 w-4" />
                        {photo.likes}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Members;
