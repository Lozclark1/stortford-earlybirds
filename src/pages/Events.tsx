import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, TrendingUp, Download, User } from "lucide-react";

const events = [
  {
    title: "Buntingford 35",
    organizer: "Rich",
    date: "Aug 02, 2025",
    dateFormatted: "Saturday, August 2nd, 2025",
    distance: "35.2 miles",
    elevation: "1,503ft",
    routeUrl: "https://ridewithgps.com/routes/34111535",
    time: "08:00:00",
    location: "Market Square",
    gpxFile: "Buntingford_35.tcx",
  },
  {
    title: "Hempstead",
    organizer: "Rich",
    date: "Aug 09, 2025",
    dateFormatted: "Saturday, August 9th, 2025",
    distance: "43 miles",
    elevation: "1,824ft",
    routeUrl: "https://ridewithgps.com/routes/30300134",
    time: "08:00:00",
    location: "Market Square",
    gpxFile: "hempstead.tcx",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4">Group Events</h1>
              <p className="text-xl">Join our cycling adventures and community rides</p>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Upcoming Events</h2>
                <Button className="shadow-glow">Create Event</Button>
              </div>
              
              <div className="space-y-6">
                {events.map((event, index) => (
                  <Card key={index} className="border-2 shadow-glow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl">{event.title}</CardTitle>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span className="text-sm">Organized by {event.organizer}</span>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-semibold">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{event.distance}, {event.elevation}</span>
                        </div>
                      </div>
                      
                      <a 
                        href={event.routeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline block"
                      >
                        {event.routeUrl}
                      </a>
                      
                      <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                        <div>
                          <p className="text-sm font-semibold mb-1">Date</p>
                          <p className="text-sm text-muted-foreground">{event.dateFormatted}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-1">Time</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">{event.time}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-1">Location</p>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">{event.location}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download GPX ({event.gpxFile})
                        </Button>
                        <Button variant="outline">Edit</Button>
                        <Button variant="outline">Cancel Event</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
