import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Bike } from "lucide-react";

const Schedule = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Weekly Ride Schedule</h2>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-lg px-4 py-1">Sunday</Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Bike className="h-5 w-5" />
                  <span className="text-sm font-medium">Distance - around 30 miles</span>
                </div>
              </div>
              <CardTitle className="text-2xl">Morning Group Ride</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-lg">8:00 AM - 12:00 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-lg">Market Square</span>
              </div>
              <CardDescription className="text-base pt-4">
                Challenging rides exploring the wider countryside. Perfect for experienced riders looking to push their limits and enjoy the beautiful Hertfordshire landscapes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
