import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface WebhookPayload {
  user: {
    email: string;
  };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to: string;
    email_action_type: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  try {
    const payload: WebhookPayload = await req.json();
    const { user, email_data } = payload;
    const { token } = email_data;

    console.log("Sending OTP email to:", user.email);

    const emailResponse = await resend.emails.send({
      from: "Stortford Early Birds <onboarding@resend.dev>",
      to: [user.email],
      subject: "Your Login Code - Stortford Early Birds",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Your Login Code</h1>
          <p>Hello,</p>
          <p>Use the following code to log in to Stortford Early Birds:</p>
          
          <div style="background-color: #f5f5f5; padding: 30px; border-radius: 8px; margin: 30px 0; text-align: center;">
            <div style="background-color: #fff; padding: 20px; border-radius: 4px; display: inline-block;">
              <code style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333;">${token}</code>
            </div>
          </div>
          
          <p>This code will expire in 60 minutes.</p>
          <p>If you didn't request this code, you can safely ignore this email.</p>
          
          <p>Best regards,<br>The Stortford Early Birds Team</p>
        </div>
      `,
    });

    console.log("OTP email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error sending OTP email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
