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
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Valid email is required").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  dob: z.string().min(1, "Date of birth is required"),
  addressLine1: z.string().trim().min(1, "Address line 1 is required").max(200),
  addressLine2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1, "City is required").max(100),
  postcode: z.string().trim().min(1, "Postcode is required").max(10),
  emergencyName: z.string().trim().min(1, "Emergency contact name is required").max(100),
  emergencyPhone: z.string().trim().min(1, "Emergency contact phone is required").max(20),
  insuranceProvider: z.string().trim().min(1, "Insurance provider is required").max(100),
  policyNo: z.string().trim().min(1, "Policy number is required").max(100),
  experience: z.string().min(1, "Please select your experience level"),
  medicalInfo: z.string().trim().max(1000).optional(),
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms"),
  safetyAccepted: z.boolean().refine((val) => val === true, "You must acknowledge the safety guidelines"),
});

type FormData = z.infer<typeof formSchema>;

// Generate a random 8-character password
const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

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
      // Generate a random password
      const tempPassword = generatePassword();
      const fullName = `${data.firstName} ${data.lastName}`;

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: tempPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
          }
        }
      });

      if (authError) {
        if (authError.message.includes("User already registered")) {
          toast.error("An account with this email already exists.");
        } else {
          throw authError;
        }
        return;
      }

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      // Store profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: data.email,
          full_name: fullName,
          date_of_birth: data.dob,
          phone_number: data.phone,
          address_line1: data.addressLine1,
          address_line2: data.addressLine2 || null,
          city: data.city,
          postcode: data.postcode,
          emergency_contact_name: data.emergencyName,
          emergency_contact_phone: data.emergencyPhone,
          insurance_company: data.insuranceProvider,
          insurance_policy_number: data.policyNo,
          cycling_experience: data.experience,
          medical_conditions: data.medicalInfo || null,
          terms_accepted: data.termsAccepted,
          safety_acknowledgment_accepted: data.safetyAccepted,
        });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        throw new Error("Failed to save profile data");
      }

      // Assign member role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'member'
        });

      if (roleError) {
        console.error("Role assignment error:", roleError);
        throw new Error("Failed to assign member role");
      }

      // Send welcome email with password
      const { error: emailError } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          email: data.email,
          fullName: fullName,
          password: tempPassword,
        }
      });

      if (emailError) {
        console.error("Email sending error:", emailError);
        toast.warning("Account created but failed to send welcome email. Please contact support.");
      } else {
        toast.success("Account created successfully! Check your email for login details.");
      }

      reset();
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast.error(error.message || "Failed to submit application. Please try again.");
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
                        <Label htmlFor="email">Email Address (will be your username) *</Label>
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
                        <Label htmlFor="addressLine1">Address Line 1 *</Label>
                        <Input id="addressLine1" {...register("addressLine1")} />
                        {errors.addressLine1 && <p className="text-sm text-destructive">{errors.addressLine1.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="addressLine2">Address Line 2</Label>
                        <Input id="addressLine2" {...register("addressLine2")} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input id="city" {...register("city")} />
                          {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postcode">Postcode *</Label>
                          <Input id="postcode" {...register("postcode")} />
                          {errors.postcode && <p className="text-sm text-destructive">{errors.postcode.message}</p>}
                        </div>
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
                      <h3 className="text-xl font-bold">Account created</h3>
                      <p className="text-muted-foreground">You'll receive an email with your login credentials</p>
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
