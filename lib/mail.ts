import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export async function sendVerifyEmail(email: string, token: string) {
  const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Cafe Tabs" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email Address – Cafe Tabs",
    html: `
      <div style="background-color:#f9f4ee;padding:40px 0;font-family:Arial,sans-serif;color:#6c6158;">
        <div style="max-width:600px;margin:0 auto;background-color:#ede7dd;border-radius:10px;overflow:hidden;border:1px solid #ded6c9;">
          
          <!-- Header -->
          <div style="background-color:#754a23;padding:20px;text-align:center;">
            <h1 style="margin:0;color:#f9f4ee;font-size:24px;letter-spacing:1px;">
              Cafe Tabs
            </h1>
            <p style="margin:4px 0 0;color:#f9f4ee;font-size:14px;">
              Premium Coffee Experience
            </p>
          </div>

          <!-- Body -->
          <div style="padding:30px;">
            <h2 style="color:#754a23;margin-top:0;">
              Verify Your Email Address
            </h2>

            <p style="line-height:1.6;">
              Hello,
            </p>

            <p style="line-height:1.6;">
              Thank you for registering at <strong>Cafe Tabs</strong>.
              To complete your registration and secure your account, please verify your email address by clicking the button below.
            </p>

            <!-- Button -->
            <div style="text-align:center;margin:30px 0;">
              <a
                href="${verifyLink}"
                style="
                  display:inline-block;
                  padding:12px 28px;
                  background-color:#754a23;
                  color:#f9f4ee;
                  text-decoration:none;
                  font-weight:bold;
                  border-radius:6px;
                  font-size:14px;
                "
              >
                Verify Email Address
              </a>
            </div>

            <p style="line-height:1.6;">
              If the button above does not work, please copy and paste the following link into your browser:
            </p>

            <p style="word-break:break-all;background:#f9f4ee;padding:10px;border-radius:6px;border:1px solid #ded6c9;">
              <a href="${verifyLink}" style="color:#754a23;text-decoration:none;">
                ${verifyLink}
              </a>
            </p>

            <p style="line-height:1.6;">
              This verification link will expire for security reasons.  
              If you did not create an account with Cafe Tabs, you can safely ignore this email.
            </p>

            <hr style="border:none;border-top:1px solid #ded6c9;margin:30px 0;" />

            <p style="font-size:13px;color:#6c6158;line-height:1.6;">
              Best regards,<br />
              <strong>Cafe Tabs Team</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color:#f9f4ee;padding:15px;text-align:center;font-size:12px;color:#6c6158;">
            © ${new Date().getFullYear()} Cafe Tabs. All rights reserved.
          </div>

        </div>
      </div>
    `,
  });
}
