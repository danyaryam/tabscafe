import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { pool } from "@/lib/db"

export const { handlers, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
      
        const res = await pool.query(
          "SELECT id, name, email, password, role, email_verified FROM users WHERE email = $1",
          [credentials.email]
        )
        const user = res.rows[0]
        if (!user) return null
      
        if (!user.email_verified) {
          throw new Error("EMAIL_NOT_VERIFIED")
        }
      
        if (!user.password || typeof user.password !== "string") return null
        const password = credentials.password as string
        if (!user.password) return null
        const hashedPassword = String(user.password)
        const isValid = await bcrypt.compare(password, hashedPassword)

        if (!isValid) return null
      
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      }

    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = (user as any).role
      }

      if (trigger === "update" && session) {
        if (session.name) token.name = session.name
        if (session.email) token.email = session.email
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
  },
})

export const { GET, POST } = handlers
