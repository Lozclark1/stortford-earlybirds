import { Bike } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  
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
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/60"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild variant="default" className="shadow-glow">
              <Link to="/join">Join Group</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
