import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ClubRules = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Club Rules & Etiquette</h1>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Safety First</h2>
              <h3 className="text-2xl font-semibold mb-4">Mandatory Safety Requirements</h3>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li><strong>Helmet Use:</strong> All riders must wear a properly fitted cycling helmet at all times</li>
                <li><strong>Bike Condition:</strong> Ensure your bike is roadworthy with working brakes, gears, and lights</li>
                <li><strong>Visibility:</strong> Wear bright clothing and use lights when required</li>
                <li><strong>Emergency Contact:</strong> Carry emergency contact information and medical details</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Group Riding Etiquette</h2>
              <h3 className="text-2xl font-semibold mb-4">Riding Formation</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
                <li>Ride no more than two abreast when safe to do so</li>
                <li>Single out when vehicles need to overtake</li>
                <li>Maintain a steady pace and avoid sudden movements</li>
                <li>Keep a safe distance from the rider in front</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4">Communication</h3>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li>Call out hazards clearly: "Hole left", "Car back", "Stopping"</li>
                <li>Use hand signals for turning and stopping</li>
                <li>Pass warnings down the line to riders behind</li>
                <li>Keep conversations at a reasonable volume</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Road Rules Compliance</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li>Obey all traffic laws and highway code</li>
                <li>Stop at red lights and give way at junctions</li>
                <li>Respect other road users including pedestrians</li>
                <li>Use cycle lanes where appropriate and safe</li>
                <li>Signal intentions clearly and in good time</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Club Ride Procedures</h2>
              <h3 className="text-2xl font-semibold mb-4">Before the Ride</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
                <li>Arrive on time for the scheduled start</li>
                <li>Introduce yourself to new riders</li>
                <li>Inform the ride leader of any fitness concerns</li>
                <li>Ensure you have sufficient water and nutrition</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4">During the Ride</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
                <li>Stay with the group - no racing ahead</li>
                <li>Help less experienced riders when needed</li>
                <li>Offer assistance if someone has mechanical issues</li>
                <li>Follow the designated route and ride leader's instructions</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4">After the Ride</h3>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li>Thank the ride leader and fellow riders</li>
                <li>Help with any post-ride activities</li>
                <li>Provide feedback if requested</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">General Behaviour Standards</h2>
              <h3 className="text-2xl font-semibold mb-4">On the Bike</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
                <li>Maintain a positive and encouraging attitude</li>
                <li>Be patient with riders of different abilities</li>
                <li>Offer help and support to fellow club members</li>
                <li>Represent the club positively in the community</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4">Off the Bike</h3>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li>Treat all members with respect and courtesy</li>
                <li>Support club events and activities</li>
                <li>Follow social media guidelines when posting about the club</li>
                <li>Pay membership fees and event costs promptly</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Event Participation</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li>Register for events in advance where required</li>
                <li>Notify organizers if you cannot attend after registering</li>
                <li>Arrive prepared with appropriate equipment and clothing</li>
                <li>Follow specific event rules and safety briefings</li>
                <li>Participate in a spirit of fun and camaraderie</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Disputes & Grievances</h2>
              <h3 className="text-2xl font-semibold mb-4">Informal Resolution</h3>
              <p className="mb-6 text-muted-foreground">
                Most issues can be resolved through open and respectful communication between the parties involved.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Formal Procedure</h3>
              <p className="mb-4 text-muted-foreground">If informal resolution is not possible:</p>
              <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground">
                <li>Submit your concern in writing to the club committee</li>
                <li>The committee will investigate the matter fairly</li>
                <li>All parties will have the opportunity to present their case</li>
                <li>A decision will be communicated within 14 days</li>
                <li>Appeals can be made to the full membership if necessary</li>
              </ol>

              <h3 className="text-2xl font-semibold mb-4">Contact for Grievances</h3>
              <p className="mb-8 text-muted-foreground">
                Email: <a href="mailto:stortfordearlybirds@gmail.com" className="text-primary hover:underline">
                  stortfordearlybirds@gmail.com
                </a>
              </p>

              <h2 className="text-3xl font-bold mb-6">Disciplinary Action</h2>
              <p className="mb-4 text-muted-foreground">Serious breaches of these rules may result in:</p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li>Verbal warning</li>
                <li>Written warning</li>
                <li>Temporary suspension from activities</li>
                <li>Termination of membership (in extreme cases)</li>
              </ul>

              <p className="text-sm text-muted-foreground italic">
                These rules are reviewed annually and all members are expected to be familiar with them. 
                Last updated: January 2024.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClubRules;
