import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface MemberProfile {
  id: string;
  full_name: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [members, setMembers] = useState<MemberProfile[]>([]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please log in to access this page");
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      if (rolesError) {
        console.error("Error checking admin role:", rolesError);
        toast.error("Error verifying admin access");
        navigate("/");
        return;
      }

      if (!roles || roles.length === 0) {
        toast.error("Access denied: Admin only");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchMembers();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/");
    }
  };

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, emergency_contact_name, emergency_contact_phone")
        .order("full_name", { ascending: true });

      if (error) throw error;

      setMembers(data || []);
    } catch (error) {
      console.error("Error fetching members:", error);
      toast.error("Failed to load member data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              View all member emergency contact information
            </p>
          </div>

          <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member Name</TableHead>
                  <TableHead>Emergency Contact Name</TableHead>
                  <TableHead>Emergency Contact Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      No members found
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.full_name}</TableCell>
                      <TableCell>{member.emergency_contact_name}</TableCell>
                      <TableCell>{member.emergency_contact_phone}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Total Members: {members.length}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
