import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { contact, code, keys } = await request.json();

    if (!contact || !code) {
      return NextResponse.json({ success: false, message: 'Missing contact details or verification code.' }, { status: 400 });
    }

    const trimmedContact = contact.trim();

    // Log code to server console for local testing/debugging
    console.log(`[SECURITY GATEWAY] Generated OTP code for ${trimmedContact}: ${code}`);

    if (!trimmedContact.includes('@')) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
    }

    // Choice A: Gmail SMTP (Free, no domain verification needed)
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;

    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass
          }
        });

        const mailOptions = {
          from: `"SwitchX Support" <${gmailUser}>`,
          to: trimmedContact,
          subject: `${code} is your SwitchX verification code`,
          text: `Welcome to SwitchX Studio! Please use the following code to verify your account: ${code}. If you did not request this code, you can safely ignore this email.`,
          html: `<div style="font-family: Arial, sans-serif; padding: 24px; background-color: #0b0c10; color: #c5c6c7; border-radius: 12px; border: 1px solid #1f2833; max-width: 480px; margin: auto;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #66fcf1; margin: 0; font-size: 20px; letter-spacing: 0.05em;">SwitchX AI Studio</h2>
            </div>
            <p style="font-size: 14px; line-height: 1.5; color: #c5c6c7;">
              Hello,<br/><br/>
              Thank you for choosing SwitchX. Please use the verification code below to secure your session or complete your setup:
            </p>
            <div style="background-color: #1f2833; padding: 16px; border-radius: 8px; text-align: center; border: 1px solid #66fcf130; margin: 24px 0;">
              <span style="font-size: 24px; font-weight: bold; letter-spacing: 0.25em; color: #66fcf1; font-family: monospace;">${code}</span>
            </div>
            <p style="font-size: 12px; line-height: 1.5; color: #a4a5a6;">
              This code will expire shortly. For security, please do not share this code with anyone.
            </p>
            <hr style="border: 0; border-top: 1px solid #1f2833; margin: 24px 0;"/>
            <p style="font-size: 10px; color: #8f9091; text-align: center; line-height: 1.4; margin: 0;">
              SwitchX Studio Inc., Connaught Place, New Delhi, India<br/>
              This is an automated security transmission. You are receiving this because an account action was requested.
            </p>
          </div>`
        };

        await transporter.sendMail(mailOptions);
        console.log(`[SUCCESS] Email successfully dispatched to ${trimmedContact} via Gmail SMTP.`);
        return NextResponse.json({ success: true, message: 'OTP verification code sent to ' + trimmedContact });
      } catch (err) {
        console.error('Gmail SMTP failed, trying Resend fallback...', err.message);
      }
    }

    // Choice B: Resend API (Requires verified domain)
    const resendApiKey = keys?.resendApiKey || process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json({
        success: false,
        message: 'Real OTP email skipped. Configure GMAIL_USER/GMAIL_PASS or RESEND_API_KEY in .env.local to enable real email transmission.'
      });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'SwitchX Sandbox <onboarding@resend.dev>',
        to: trimmedContact,
        subject: 'Your SwitchX OTP Verification Code',
        text: `Your SwitchX verification code is: ${code}`,
        html: `<div style="font-family: sans-serif; padding: 20px; background-color: #050508; color: #f3f4f6; border-radius: 12px; border: 1px solid #6366f130;">
          <h2 style="color: #818cf8; text-transform: uppercase; letter-spacing: 0.1em; font-size: 16px;">SwitchX Verification</h2>
          <p style="font-size: 13px; color: #9ca3af;">Please use the following verification code to complete your SwitchX profile creation:</p>
          <div style="background-color: #000; padding: 12px; border-radius: 8px; text-align: center; border: 1px solid #818cf840; margin: 16px 0;">
            <span style="font-size: 20px; font-weight: bold; letter-spacing: 0.3em; color: #a5b4fc; font-family: monospace;">${code}</span>
          </div>
          <p style="font-size: 10px; color: #4b5563; margin-top: 20px;">This is an automated transmission from the SwitchX Client Sandbox.</p>
        </div>`
      })
    });

    const data = await res.json();
    if (res.ok) {
      return NextResponse.json({ success: true, message: 'OTP verification code sent to ' + trimmedContact });
    } else {
      return NextResponse.json({ success: false, message: `Resend error: ${data.message || res.statusText}` });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: `OTP dispatch failure: ${error.message}` }, { status: 500 });
  }
}
