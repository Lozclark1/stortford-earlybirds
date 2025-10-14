import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Access to weekly group rides",
  "Experienced ride leaders",
  "Social events and activities",
  "Training and coaching support",
  "Member-only newsletter",
  "Discounts at local bike shops",
  "Racing opportunities",
  "Welcoming community",
];

const Join = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Join Stortford Early Birds</h1>
            <p className="text-xl">Become part of our cycling community today</p>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 shadow-glow">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-2">Membership Benefits</CardTitle>
                  <CardDescription className="text-lg">
                    Everything you need to enjoy cycling with SEB
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-6 mb-8">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary mb-2">£30</p>
                      <p className="text-muted-foreground">Annual Membership</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-center">
                    <Button size="lg" className="shadow-glow w-full md:w-auto">
                      Sign Up Now
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      First ride is free for new members. No commitment required to try us out!
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-12 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-muted-foreground">
                  Join us for a ride and see what SEB is all about. We meet every Sunday morning 
                  at Market Square. Just turn up with your bike, and we'll take care of the rest. 
                  All abilities welcome!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Join;
