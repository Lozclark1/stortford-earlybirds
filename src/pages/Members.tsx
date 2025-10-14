import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Heart } from "lucide-react";

const Members = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Our Members</h1>
            <p className="text-xl">Meet the passionate cyclists who make SEB special</p>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="border-2 hover:shadow-glow transition-all">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>150+ Active Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A diverse community of cyclists from all walks of life
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:shadow-glow transition-all">
                <CardHeader>
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>All Experience Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    From beginners to competitive racers, everyone is welcome
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:shadow-glow transition-all">
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Supportive Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Friendly riders who support each other on and off the bike
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our members are the heart of SEB. We're proud to have built a welcoming, 
                inclusive community where cyclists of all abilities can come together to 
                share their passion for cycling. Whether you're looking for training partners, 
                social rides, or just friendly faces to chat with over coffee, you'll find 
                them all here.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Members;
