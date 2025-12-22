import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
})

export async function sendVerifyEmail(email: string, token: string) {
//   const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}`
    const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
  await transporter.sendMail({
    from: `"Cafe Tabs" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `<p>Click this link to verify your email:</p><a href="${verifyLink}">${verifyLink}</a>`,
  })
}
