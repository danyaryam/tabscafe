import type React from "react"
import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div role="status" aria-label="Loading" className={cn("inline-block size-4", className)} {...props}>
      <img src="/loading.svg" alt="Loading..." className="w-full h-full" />
    </div>
  )
}

export { Spinner }
