import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MembershipApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
  insuranceProvider: string;
  policyNo: string;
  experience: string;
  medicalInfo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const application: MembershipApplication = await req.json();
    console.log("Received membership application:", application);

    const experienceLabels: Record<string, string> = {
      beginner: "Beginner - New to cycling",
      recreational: "Recreational - Casual cycling",
      intermediate: "Intermediate - Regular rider",
      advanced: "Advanced - Experienced cyclist",
      competitive: "Competitive - Racing experience",
    };

    const emailResponse = await resend.emails.send({
      from: "SEB Membership <membership@stortfordearlybirds.co.uk>",
      to: ["stortfordearlybirds@gmail.com"],
      replyTo: application.email,
      subject: `New Membership Application - ${application.firstName} ${application.lastName}`,
      html: `
        <h1>New Membership Application</h1>
        
        <h2>Personal Information</h2>
        <p><strong>Name:</strong> ${application.firstName} ${application.lastName}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Phone:</strong> ${application.phone}</p>
        <p><strong>Date of Birth:</strong> ${application.dob}</p>
        <p><strong>Address:</strong> ${application.address}</p>
        
        <h2>Emergency Contact</h2>
        <p><strong>Name:</strong> ${application.emergencyName}</p>
        <p><strong>Phone:</strong> ${application.emergencyPhone}</p>
        
        <h2>Insurance Information</h2>
        <p><strong>Provider:</strong> ${application.insuranceProvider}</p>
        <p><strong>Policy Number:</strong> ${application.policyNo}</p>
        
        <h2>Cycling Information</h2>
        <p><strong>Experience Level:</strong> ${experienceLabels[application.experience] || application.experience}</p>
        ${application.medicalInfo ? `<p><strong>Medical Conditions/Allergies:</strong> ${application.medicalInfo}</p>` : ""}
        
        <hr>
        <p><small>This application was submitted through the SEB website on ${new Date().toLocaleString()}.</small></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, messageId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending membership application:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
