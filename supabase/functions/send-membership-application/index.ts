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

// HTML escape function to prevent injection
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate input lengths
function validateApplication(app: MembershipApplication): string | null {
  if (app.firstName.length > 100) return "First name too long";
  if (app.lastName.length > 100) return "Last name too long";
  if (!isValidEmail(app.email)) return "Invalid email format";
  if (app.email.length > 255) return "Email too long";
  if (app.phone.length > 20) return "Phone number too long";
  if (app.address.length > 500) return "Address too long";
  if (app.emergencyName.length > 100) return "Emergency contact name too long";
  if (app.emergencyPhone.length > 20) return "Emergency phone too long";
  if (app.insuranceProvider.length > 200) return "Insurance provider name too long";
  if (app.policyNo.length > 100) return "Policy number too long";
  if (app.medicalInfo && app.medicalInfo.length > 1000) return "Medical info too long";
  return null;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const application: MembershipApplication = await req.json();
    
    // Validate input
    const validationError = validateApplication(application);
    if (validationError) {
      return new Response(
        JSON.stringify({ error: validationError }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    console.log("Received membership application for:", escapeHtml(application.email));

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
      subject: `New Membership Application - ${escapeHtml(application.firstName)} ${escapeHtml(application.lastName)}`,
      html: `
        <h1>New Membership Application</h1>
        
        <h2>Personal Information</h2>
        <p><strong>Name:</strong> ${escapeHtml(application.firstName)} ${escapeHtml(application.lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(application.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(application.phone)}</p>
        <p><strong>Date of Birth:</strong> ${escapeHtml(application.dob)}</p>
        <p><strong>Address:</strong> ${escapeHtml(application.address)}</p>
        
        <h2>Emergency Contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(application.emergencyName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(application.emergencyPhone)}</p>
        
        <h2>Insurance Information</h2>
        <p><strong>Provider:</strong> ${escapeHtml(application.insuranceProvider)}</p>
        <p><strong>Policy Number:</strong> ${escapeHtml(application.policyNo)}</p>
        
        <h2>Cycling Information</h2>
        <p><strong>Experience Level:</strong> ${escapeHtml(experienceLabels[application.experience] || application.experience)}</p>
        ${application.medicalInfo ? `<p><strong>Medical Conditions/Allergies:</strong> ${escapeHtml(application.medicalInfo)}</p>` : ""}
        
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
