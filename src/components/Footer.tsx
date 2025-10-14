import { Bike } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bike className="h-6 w-6" />
              <span className="font-bold">Stortford Early Birds</span>
            </div>
            <p className="text-background/80">
              A friendly cycling community in Bishop's Stortford since 1990
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/80 hover:text-background transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/members" className="text-background/80 hover:text-background transition-colors">
                  Members
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-background/80 hover:text-background transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-background/80 hover:text-background transition-colors">
                  Join Now
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-background/80">
              Market Square<br />
              Bishop's Stortford<br />
              Hertfordshire
            </p>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
            <a href="mailto:stortfordearlybirds@gmail.com" className="text-background/80 hover:text-background transition-colors">
              Contact Us
            </a>
            <span className="text-background/40">•</span>
            <Link to="/privacy-policy" className="text-background/80 hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <span className="text-background/40">•</span>
            <Link to="/safeguarding-policy" className="text-background/80 hover:text-background transition-colors">
              Safeguarding Policy
            </Link>
            <span className="text-background/40">•</span>
            <Link to="/club-rules" className="text-background/80 hover:text-background transition-colors">
              Club Rules & Etiquette
            </Link>
            <span className="text-background/40">•</span>
            <Link to="/cookie-policy" className="text-background/80 hover:text-background transition-colors">
              Cookie Policy
            </Link>
          </div>
          <p className="text-center text-background/60">&copy; {new Date().getFullYear()} Stortford Early Birds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
