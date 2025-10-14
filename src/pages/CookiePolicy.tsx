import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Cookie Policy</h1>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">What Are Cookies</h2>
              <p className="mb-8 text-muted-foreground">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better browsing experience and remember your preferences 
                for future visits.
              </p>

              <h2 className="text-3xl font-bold mb-6">How We Use Cookies</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality and security</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Authentication Cookies:</strong> Keep you logged in to your member account</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Third-Party Cookies</h2>
              <p className="mb-8 text-muted-foreground">
                We may use third-party services for analytics and functionality. These services may place 
                their own cookies on your device. We recommend reviewing their privacy policies for more 
                information about their cookie usage.
              </p>

              <h2 className="text-3xl font-bold mb-6">Managing Cookies</h2>
              <p className="mb-8 text-muted-foreground">
                You can control and manage cookies through your browser settings. However, disabling certain 
                cookies may affect the functionality of our website and your user experience.
              </p>

              <h2 className="text-3xl font-bold mb-6">Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page 
                with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;
