import { Users, CalendarDays, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Members",
    description: "A vibrant community of cyclists from all backgrounds and skill levels",
  },
  {
    icon: CalendarDays,
    title: "Weekly Rides",
    description: "Multiple rides every week through the stunning Hertfordshire countryside",
  },
  {
    icon: Trophy,
    title: "Events & Racing",
    description: "Regular group events, competitions, and social gatherings throughout the year",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Group</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're a friendly cycling group based in Bishop's Stortford, welcoming riders of all abilities. From leisurely weekend rides to competitive racing, there's something for everyone.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-2 hover:shadow-glow transition-all duration-300 hover:scale-105 bg-gradient-card"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
