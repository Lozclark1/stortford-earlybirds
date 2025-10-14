import { Bike, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
    } else {
      toast.success("Logged out successfully");
      navigate("/");
    }
  };
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Members", path: "/members" },
    { name: "Events", path: "/events" },
    { name: "Join Now", path: "/join" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Bike className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold">
              Stortford Early Birds <span className="text-secondary">(SEB)</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/"
                  ? "text-primary"
                  : "text-foreground/60"
              }`}
            >
              Home
            </Link>
            
            {user && (
              <>
                <Link
                  to="/members"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === "/members"
                      ? "text-primary"
                      : "text-foreground/60"
                  }`}
                >
                  Gallery
                </Link>
                <Link
                  to="/events"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === "/events"
                      ? "text-primary"
                      : "text-foreground/60"
                  }`}
                >
                  Events
                </Link>
                <Link
                  to="/profile"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === "/profile"
                      ? "text-primary"
                      : "text-foreground/60"
                  }`}
                >
                  Profile
                </Link>
              </>
            )}
            
            {user ? (
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild variant="default" className="shadow-glow">
                  <Link to="/join">Join Group</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
