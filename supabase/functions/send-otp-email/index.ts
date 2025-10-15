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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 28px;">🚴 Stortford Early Birds</h1>
          </div>
          
          <div style="background-color: #fff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Your Login Verification Code</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">Hello,</p>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Please enter the following 6-digit code on the login page to access your account:
            </p>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
              <div style="background-color: #fff; padding: 25px; border-radius: 8px; display: inline-block; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <code style="font-size: 42px; font-weight: bold; letter-spacing: 12px; color: #333; font-family: 'Courier New', monospace;">${token}</code>
              </div>
            </div>
            
            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>⚠️ Important:</strong> Do not share this code with anyone. Our team will never ask for your verification code.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              This code will expire in <strong>60 minutes</strong> for security reasons.
            </p>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              If you didn't request this code, please ignore this email. Your account remains secure.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; line-height: 1.6; margin: 0;">
              Best regards,<br>
              <strong>The Stortford Early Birds Team</strong>
            </p>
          </div>
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
