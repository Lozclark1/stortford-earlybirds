import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SafeguardingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Safeguarding Policy</h1>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Our Commitment to Safeguarding</h2>
              <p className="mb-8 text-muted-foreground">
                Stortford Early Birds is committed to providing a safe and welcoming environment for all members, 
                particularly vulnerable adults and young people who may participate in our cycling activities.
              </p>

              <h2 className="text-3xl font-bold mb-6">Safeguarding Principles</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li>The welfare of all participants is our primary concern</li>
                <li>All members have the right to protection from abuse and harm</li>
                <li>We will treat all participants with respect and dignity</li>
                <li>We will listen to and take seriously any concerns raised</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Our Responsibilities</h2>
              <p className="mb-4 text-muted-foreground font-semibold">We will:</p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li>Ensure all ride leaders and volunteers understand their safeguarding responsibilities</li>
                <li>Provide appropriate supervision during cycling activities</li>
                <li>Maintain appropriate ratios of adults to young participants</li>
                <li>Follow safe recruitment practices for volunteers and leaders</li>
                <li>Report any safeguarding concerns to the appropriate authorities</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Reporting Concerns</h2>
              <p className="mb-4 text-muted-foreground">
                If you have any safeguarding concerns, please contact our Safeguarding Officer immediately:
              </p>
              <p className="mb-8 text-muted-foreground">
                Email: <a href="mailto:stortfordearlybirds@gmail.com" className="text-primary hover:underline">
                  stortfordearlybirds@gmail.com
                </a>
              </p>

              <h2 className="text-3xl font-bold mb-6">Emergency Contacts</h2>
              <p className="mb-4 text-muted-foreground">In case of immediate danger or emergency:</p>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li>Call 999 for emergency services</li>
                <li>Contact local police on 101 for non-emergency matters</li>
                <li>Contact Social Services if you have concerns about a vulnerable adult</li>
              </ul>

              <p className="text-sm text-muted-foreground italic">
                This policy is reviewed annually and was last updated in January 2024.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SafeguardingPolicy;
