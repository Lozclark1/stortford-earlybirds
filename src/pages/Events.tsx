import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Coffee } from "lucide-react";

const events = [
  {
    icon: Trophy,
    title: "Annual Club Championship",
    date: "June 2025",
    description: "Our premier racing event where members compete across various categories. A day of friendly competition followed by awards ceremony.",
    type: "Competition",
  },
  {
    icon: Coffee,
    title: "Monthly Social Rides",
    date: "Last Sunday of each month",
    description: "Relaxed social rides followed by coffee and cake at local cafés. Perfect for new members to get acquainted.",
    type: "Social",
  },
  {
    icon: Calendar,
    title: "Weekend Training Rides",
    date: "Every Saturday & Sunday",
    description: "Structured training sessions for members looking to improve their fitness and cycling skills.",
    type: "Training",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Events & Activities</h1>
            <p className="text-xl">Join us for rides, races, and social gatherings throughout the year</p>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <Card key={index} className="border-2 hover:shadow-glow transition-all hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <event.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{event.type}</Badge>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="font-semibold text-foreground/80">
                      {event.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Something for Everyone</h2>
              <p className="text-lg text-muted-foreground">
                Whether you're interested in competitive racing, social rides, or just improving 
                your fitness, we have events throughout the year to suit all interests and abilities. 
                Members receive regular updates about upcoming events via our newsletter.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
