import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Information We Collect</h2>
              <p className="mb-8 text-muted-foreground">
                When you join Stortford Early Birds, we collect personal information including your name, 
                email address, phone number, emergency contact details, and cycling experience to ensure 
                your safety and provide the best group cycling experience.
              </p>

              <h2 className="text-3xl font-bold mb-6">How We Use Your Information</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li>To communicate ride schedules and group updates</li>
                <li>To contact you in case of emergencies during rides</li>
                <li>To maintain membership records and insurance requirements</li>
                <li>To improve our cycling events and community experience</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Data Protection</h2>
              <p className="mb-8 text-muted-foreground">
                We take the security of your personal information seriously. Your data is stored securely 
                and is only accessible to authorized club officials. We will never sell or share your 
                personal information with third parties without your explicit consent.
              </p>

              <h2 className="text-3xl font-bold mb-6">Your Rights</h2>
              <p className="mb-8 text-muted-foreground">
                You have the right to access, update, or delete your personal information at any time. 
                To exercise these rights or if you have any questions about our privacy practices, 
                please contact us through our official channels.
              </p>

              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact the club secretary 
                or visit our contact page for more information.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
