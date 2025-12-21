import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#8B4513] to-[#D2691E] p-12 flex-col justify-between">
        <Link href="/" className="flex items-center gap-2 text-[#FFF8DC]">
          <div className="w-10 h-10 bg-[#FFF8DC] rounded-lg flex items-center justify-center">
            <span className="text-[#8B4513] font-bold text-lg">CT</span>
          </div>
          <span className="text-2xl font-bold">Cafe Tabs</span>
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#FFF8DC] text-balance">Welcome back to your favorite coffee shop</h1>
          <p className="text-[#FFF8DC]/80 text-lg">
            Sign in to access your orders, track deliveries, and enjoy exclusive member benefits.
          </p>
        </div>

        <div className="flex gap-8 text-[#FFF8DC]/60 text-sm">
          <div>
            <div className="text-2xl font-bold text-[#FFF8DC]">10K+</div>
            <div>Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#FFF8DC]">50K+</div>
            <div>Orders Delivered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#FFF8DC]">4.9</div>
            <div>Average Rating</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:hidden mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-[#8B4513]">
              <div className="w-10 h-10 bg-[#8B4513] rounded-lg flex items-center justify-center">
                <span className="text-[#FFF8DC] font-bold text-lg">CT</span>
              </div>
              <span className="text-2xl font-bold">Cafe Tabs</span>
            </Link>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-[#2C1810]">Sign in to your account</h2>
            <p className="text-[#8B7355]">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#8B4513] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <LoginForm />

          <div className="text-center text-sm text-[#8B7355]">
            By continuing, you agree to our{" "}
            <Link href="#" className="text-[#8B4513] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-[#8B4513] hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
