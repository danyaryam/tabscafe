import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata = {
    title: "About Us - Cafe Tabs",
    description:
        "Meet the talented team behind Cafe Tabs - innovative web developers crafting exceptional digital experiences.",
}

export default function AboutPage() {
    const developers = [
        {
            name: "Dany Arya Maulana",
            role: "Full Stack Developer",
            bio: "Passionate about creating seamless user experiences and scalable backend architectures. Specializing in Next.js and modern web technologies.",
            skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
            github: "https://github.com/danyaryam",
            linkedin: "https://linkedin.com/in/dany-arya-maulana",
            instagram: "https://instagram.com/danyarya.m",
            email: "danyarya10k@gmail.com",
            image: "",
        },
        {
            name: "Muhammad Aldyn Ismail Putra",
            role: "Backend Developer",
            bio: "Crafting pixel-perfect interfaces with a focus on accessibility and performance. Turning designs into beautiful, responsive web applications.",
            skills: ["React", "Tailwind CSS", "UI/UX", "Animation", "Accessibility"],
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/",
            instagram: "https://instagram.com/",
            email: "",
            image: "",
        },
        {
            name: "Salam Rizqi Mulia",
            role: "Backend Architect & API Specialist",
            bio: "Building robust, secure payment systems and APIs. Expert in database optimization and cloud infrastructure for high-traffic applications.",
            skills: ["Python", "Go", "Microservices", "Redis", "Docker"],
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/",
            instagram: "https://instagram.com/",
            email: "",
            image: "",
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent/20 to-background">
                <div className="max-w-7xl mx-auto text-center">
                    <Badge className="mb-4" variant="outline">
                        Meet the Team
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 text-balance">
                        The Developers Behind Cafe Tabs
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
                        We re a team of passionate developers dedicated to building exceptional web experiences. From concept to
                        deployment, we craft solutions that blend innovation with reliability.
                    </p>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {developers.map((dev, index) => (
                            <Card key={index} className="overflow-hidden border-border/50 hover:border-border transition-colors">
                                <div className="aspect-square relative overflow-hidden bg-accent/10">
                                    <img
                                        src={dev.image || "/placeholder.svg"}
                                        alt={dev.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-serif font-semibold mb-1">{dev.name}</h3>
                                    <p className="text-sm text-accent font-medium mb-4">{dev.role}</p>
                                    <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">{dev.bio}</p>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold mb-3 text-foreground">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {dev.skills.map((skill, idx) => (
                                                <Badge key={idx} variant="secondary" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator className="mb-4" />

                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                                            <a href={dev.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                                <Github className="h-4 w-4" />
                                            </a>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                                            <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                                <Linkedin className="h-4 w-4" />
                                            </a>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                                            <a href={dev.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                                <Instagram className="h-4 w-4" />
                                            </a>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                                            <a href={`mailto:${dev.email}`} aria-label="Email">
                                                <Mail className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Mission</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
                        At Cafe Tabs, we believe great coffee deserves great technology. We ve built a platform that makes ordering
                        your favorite brew as smooth as the espresso we serve. Our focus is on creating intuitive, fast, and secure
                        experiences that keep our customers coming back.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-accent mb-2">3+</div>
                            <p className="text-sm text-muted-foreground">Years Experience</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-accent mb-2">10k+</div>
                            <p className="text-sm text-muted-foreground">Happy Customers</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-accent mb-2">99.9%</div>
                            <p className="text-sm text-muted-foreground">Uptime</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
