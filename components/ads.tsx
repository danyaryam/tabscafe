"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

export default function Ads() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
    }, [])

    if (!show) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
                onClick={() => setShow(false)}
            />

            <div className="relative z-10 max-w-md w-[90%] rounded-2xl overflow-hidden shadow-2xl">
                <button
                    onClick={() => setShow(false)}
                    className="absolute top-3 right-3 z-20 bg-white/80 hover:bg-white rounded-full p-1"
                >
                    <X size={18} />
                </button>

                <Image
                    src="/ads/promo.png"
                    alt="Promo TabsCafe"
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                    priority
                />
            </div>
        </div>
    )
}