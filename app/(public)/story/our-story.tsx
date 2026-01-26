"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const timeline = [
    {
        year: "2021",
        title: "The First Brew",
        content:
            "TabsCafe dimulai sebagai coffee corner kecil dengan fokus pada kualitas rasa dan pengalaman minum kopi yang personal.",
    },
    {
        year: "2022",
        title: "Growing the Community",
        content:
            "Kami mulai membangun komunitas melalui event diskusi, kolaborasi UMKM, dan sistem membership.",
    },
    {
        year: "2023",
        title: "Sourcing with Purpose",
        content:
            "Kerja sama langsung dengan petani kopi lokal untuk memastikan kualitas dan keberlanjutan.",
    },
    {
        year: "2024",
        title: "Digital Expansion",
        content:
            "Peluncuran website dan sistem pemesanan online untuk meningkatkan aksesibilitas pelanggan.",
    },
]

const origins = [
    {
        name: "Gayo, Aceh",
        notes: "Chocolate, herbal, nutty",
        story:
            "Kopi Arabika Gayo ditanam di dataran tinggi Aceh dengan sistem direct trade bersama koperasi lokal.",
    },
    {
        name: "Kintamani, Bali",
        notes: "Citrus, floral",
        story:
            "Diproses secara natural dan honey dengan pendekatan pertanian ramah lingkungan.",
    },
    {
        name: "Toraja, Sulawesi",
        notes: "Earthy, bold body",
        story:
            "Menghasilkan karakter kopi dengan body tebal dan aftertaste panjang.",
    },
]

export default function OurStoryPage() {
    return (
        <section className="space-y-24 px-6 py-20 max-w-6xl mx-auto">
            <Hero />
            <TimelineSection />
            <OriginSection />
            <MissionSection />
            <StructuredData />
        </section>
    )
}


function Hero() {
    return (
        <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Our Story</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Dari biji kopi pilihan hingga ruang yang membangun koneksi dan kreativitas.
            </p>
        </div>
    )
}

function TimelineSection() {
    return (
        <div className="space-y-10">
            <SectionTitle title="Company History" />
            <div className="space-y-4">
                {timeline.map((item, i) => (
                    <AccordionItem key={i} title={`${item.year} — ${item.title}`}>
                        {item.content}
                    </AccordionItem>
                ))}
            </div>
        </div>
    )
}


function OriginSection() {
    return (
        <div className="space-y-10">
            <SectionTitle title="Coffee Sourcing & Origin" />
            <div className="grid md:grid-cols-3 gap-6">
                {origins.map((o, i) => (
                    <AccordionCard key={i} title={o.name} subtitle={o.notes}>
                        {o.story}
                    </AccordionCard>
                ))}
            </div>
        </div>
    )
}

function MissionSection() {
    return (
        <div className="space-y-10">
            <SectionTitle title="Mission & Values" />
            <Card className="rounded-2xl">
                <CardContent className="p-8 space-y-4">
                    <p>
                        Misi kami adalah menyajikan kopi berkualitas tinggi sambil membangun
                        ruang yang mendorong koneksi, kreativitas, dan keberlanjutan.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Quality First</li>
                        <li>Transparency</li>
                        <li>Community Driven</li>
                        <li>Sustainability</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

function StructuredData() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        name: "TabsCafe",
        url: "https://tabscafe.com",
        description:
            "TabsCafe adalah coffee shop yang mengedepankan kualitas biji kopi, transparansi sourcing, dan komunitas kreatif.",
        servesCuisine: "Coffee",
        sameAs: [
            "https://instagram.com/tabscafe",
            "https://twitter.com/tabscafe",
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

function SectionTitle({ title }: { title: string }) {
    return <h2 className="text-2xl font-semibold">{title}</h2>
}

function AccordionItem({ title, children }: any) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border rounded-xl">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center p-4 font-medium"
            >
                {title}
                <ChevronDown
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden px-4 pb-4 text-muted-foreground"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function AccordionCard({ title, subtitle, children }: any) {
    const [open, setOpen] = useState(false)
    return (
        <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="text-sm text-muted-foreground">{subtitle}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
                        <ChevronDown
                            className={`transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </Button>
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-sm text-muted-foreground"
                        >
                            {children}
                        </motion.p>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}
