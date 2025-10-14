import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  dob: z.string().min(1, "Date of birth is required"),
  address: z.string().min(1, "Address is required"),
  emergencyName: z.string().min(1, "Emergency contact name is required"),
  emergencyPhone: z.string().min(1, "Emergency contact phone is required"),
  insuranceProvider: z.string().min(1, "Insurance provider is required"),
  policyNo: z.string().min(1, "Policy number is required"),
  experience: z.string().min(1, "Please select your experience level"),
  medicalInfo: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms"),
  safetyAccepted: z.boolean().refine((val) => val === true, "You must acknowledge the safety guidelines"),
});

type FormData = z.infer<typeof formSchema>;

const Join = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: result, error } = await supabase.functions.invoke("send-membership-application", {
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          dob: data.dob,
          address: data.address,
          emergencyName: data.emergencyName,
          emergencyPhone: data.emergencyPhone,
          insuranceProvider: data.insuranceProvider,
          policyNo: data.policyNo,
          experience: data.experience,
          medicalInfo: data.medicalInfo,
        },
      });

      if (error) {
        throw error;
      }

      toast.success("Application submitted successfully! We'll be in touch soon.");
      reset();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Join Stortford Early Birds (SEB)</h1>
            <p className="text-xl">Ready to start your cycling journey with us? Complete the form below to become a member.</p>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 shadow-glow">
                <CardHeader>
                  <CardTitle className="text-2xl">Membership Application</CardTitle>
                  <p className="text-muted-foreground">Please fill out all required fields to complete your membership application.</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" {...register("firstName")} />
                          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" {...register("lastName")} />
                          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" {...register("phone")} />
                          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth *</Label>
                          <Input id="dob" type="date" {...register("dob")} />
                          {errors.dob && <p className="text-sm text-destructive">{errors.dob.message}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Textarea id="address" {...register("address")} />
                        {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Emergency Contact</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyName">Emergency Contact Name *</Label>
                          <Input id="emergencyName" {...register("emergencyName")} />
                          {errors.emergencyName && <p className="text-sm text-destructive">{errors.emergencyName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                          <Input id="emergencyPhone" {...register("emergencyPhone")} />
                          {errors.emergencyPhone && <p className="text-sm text-destructive">{errors.emergencyPhone.message}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Insurance */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Compulsory 3rd Party Insurance</h3>
                      <p className="text-sm text-muted-foreground">
                        Accepted providers: <a href="https://www.cyclinguk.org/insurance" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cycling UK</a>, <a href="https://laka.co/gb" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Laka</a>, <a href="https://www.britishcycling.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">British Cycling</a>
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="insuranceProvider">Provider Name *</Label>
                          <Input id="insuranceProvider" {...register("insuranceProvider")} />
                          {errors.insuranceProvider && <p className="text-sm text-destructive">{errors.insuranceProvider.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="policyNo">Policy No. *</Label>
                          <Input id="policyNo" {...register("policyNo")} />
                          {errors.policyNo && <p className="text-sm text-destructive">{errors.policyNo.message}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Cycling Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Cycling Information</h3>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Cycling Experience *</Label>
                        <Select onValueChange={(value) => setValue("experience", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner - New to cycling</SelectItem>
                            <SelectItem value="recreational">Recreational - Casual cycling</SelectItem>
                            <SelectItem value="intermediate">Intermediate - Regular rider</SelectItem>
                            <SelectItem value="advanced">Advanced - Experienced cyclist</SelectItem>
                            <SelectItem value="competitive">Competitive - Racing experience</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.experience && <p className="text-sm text-destructive">{errors.experience.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="medicalInfo">Medical Conditions or Allergies</Label>
                        <Textarea id="medicalInfo" {...register("medicalInfo")} placeholder="Optional" />
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Terms and Conditions</h3>
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="termsAccepted" 
                          onCheckedChange={(checked) => setValue("termsAccepted", checked as boolean)}
                        />
                        <Label htmlFor="termsAccepted" className="font-normal leading-tight">
                          I agree to the group's terms and conditions, and understand that membership fees are non-refundable.
                        </Label>
                      </div>
                      {errors.termsAccepted && <p className="text-sm text-destructive">{errors.termsAccepted.message}</p>}
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="safetyAccepted" 
                          onCheckedChange={(checked) => setValue("safetyAccepted", checked as boolean)}
                        />
                        <Label htmlFor="safetyAccepted" className="font-normal leading-tight">
                          I acknowledge that cycling carries inherent risks and agree to follow all safety guidelines and wear appropriate protective equipment.
                        </Label>
                      </div>
                      {errors.safetyAccepted && <p className="text-sm text-destructive">{errors.safetyAccepted.message}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full shadow-glow" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* What Happens Next */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-center mb-12">What Happens Next?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground">Step 1</p>
                      <h3 className="text-xl font-bold">Application accepted</h3>
                      <p className="text-muted-foreground">Your application will be reviewed and accepted</p>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground">Step 2</p>
                      <h3 className="text-xl font-bold">Join the WhatsApp group</h3>
                      <p className="text-muted-foreground">You'll be added to our WhatsApp group for updates and ride information</p>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground">Step 3</p>
                      <h3 className="text-xl font-bold">Join the Group for a ride</h3>
                      <p className="text-muted-foreground">Come join us for your first group ride and meet the community!</p>
                    </div>
                  </div>
                </div>
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
