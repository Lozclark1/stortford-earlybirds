import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">About Stortford Early Birds (SEB)</h2>
          
          <div className="space-y-6 text-lg text-muted-foreground mb-8">
            <p>
              Founded in 1990, Stortford Early Birds (SEB) has been proudly promoting cycling in the Bishop's Stortford area for nearly four decades.
            </p>
            
            <p>
              We're a friendly, inclusive group that welcomes cyclists of all levels — whether you're just starting out or a seasoned rider. Our regular group rides and social events are a great way to meet others, explore the local area, and simply enjoy being out on your bike.
            </p>
            
            <p>
              Safety is a core part of what we do. All our rides are led by experienced ride leaders who know the local roads like the back of their hand and are committed to making every ride enjoyable and safe for everyone.
            </p>
            
            <p className="font-semibold text-foreground">
              So come and join us — we'd love to see you out on the road!
            </p>
          </div>
          
          <Button asChild size="lg" className="shadow-glow">
            <Link to="/join">Become a Member Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
