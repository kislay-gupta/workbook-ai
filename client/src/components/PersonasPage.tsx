import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, Globe, BookOpen, Users } from "lucide-react"
import { personaConfigs } from "@/utils/personas"

interface PersonasPageProps {
    onBack: () => void
    onSelectPersona: (persona: string) => void
}

const personas = [
    {
        id: "hitesh",
        name: "Hitesh Choudhary",
        title: "Tech Educator & YouTuber",
        description: "Learn from the master of web development and programming education. Hitesh brings 15+ years of experience and has taught 16,00,000+ students.",
        expertise: ["Web Development", "JavaScript", "React", "Node.js", "Career Guidance"],
        stats: {
            experience: "15+ Years",
            students: "16,00,000+",
            channels: "2 YouTube Channels",
            countries: "43 Countries Visited"
        },
        color: personaConfigs.hitesh.color,
        accent: personaConfigs.hitesh.accent,
        image: personaConfigs.hitesh.image,
        highlights: [
            "Founder & CEO of ChaiCode",
            "Ex-CTO at iNeuron.ai",
            "Sr. Director at PhysicsWallah",
            "950k & 470k YouTube subscribers"
        ]
    },
    {
        id: "piyush",
        name: "Piyush Garg",
        title: "Popular Tech YouTuber & Developer",
        description: "Master system design and scalable architectures with Piyush. A 25-year-old innovator who founded Teachyst and serves 10,000+ students.",
        expertise: ["System Design", "Microservices", "Scalable Architecture", "Full Stack Development", "DevOps"],
        stats: {
            age: "25 Years Old",
            students: "10,000+ on Teachyst",
            company: "Founder of Teachyst",
            experience: "Full Stack Expert"
        },
        color: personaConfigs.piyush.color,
        accent: personaConfigs.piyush.accent,
        image: personaConfigs.piyush.image,
        highlights: [
            "Founder of Teachyst Platform",
            "Ex-Founding Engineer at Dimension",
            "System Design Specialist",
            "Popular Tech YouTuber"
        ]
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        y: -10,
        scale: 1.02,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 20
        }
    }
}

const statVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.3 }
    }
}

export function PersonasPage({ onBack, onSelectPersona }: PersonasPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#264653] via-[#2a9d8f] to-[#e9c46a]">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="text-white hover:bg-white/20 rounded-full"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            Choose Your AI Mentor
                        </h1>
                        <p className="text-white/80 text-lg">
                            Select a persona to start your personalized learning journey
                        </p>
                    </div>
                </motion.div>

                {/* Personas Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
                >
                    {personas.map((persona) => (
                        <motion.div
                            key={persona.id}
                            variants={cardVariants}
                            whileHover="hover"
                            className="group"
                        >
                            <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
                                {/* Header with gradient */}
                                <div className={`bg-gradient-to-r ${persona.color} p-6 text-white relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden flex items-center justify-center">
                                                <img
                                                    src={persona.image}
                                                    alt={`${persona.name} avatar`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold">{persona.name}</h2>
                                                <p className="text-white/90">{persona.title}</p>
                                            </div>
                                        </div>
                                        <p className="text-white/95 leading-relaxed">
                                            {persona.description}
                                        </p>
                                    </div>
                                </div>

                                <CardContent className="p-6 space-y-6">
                                    {/* Stats */}
                                    <motion.div
                                        variants={statVariants}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        {Object.entries(persona.stats).map(([key, value]) => (
                                            <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="font-bold text-[#264653]">{value}</div>
                                                <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                            </div>
                                        ))}
                                    </motion.div>

                                    {/* Expertise */}
                                    <div>
                                        <h3 className="font-semibold text-[#264653] mb-3 flex items-center gap-2">
                                            <BookOpen className="h-4 w-4" />
                                            Expertise
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {persona.expertise.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-3 py-1 bg-gradient-to-r from-[#2a9d8f]/10 to-[#e9c46a]/10 text-[#264653] rounded-full text-sm border border-[#2a9d8f]/20"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div>
                                        <h3 className="font-semibold text-[#264653] mb-3 flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            Highlights
                                        </h3>
                                        <ul className="space-y-2">
                                            {persona.highlights.map((highlight, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * index }}
                                                    className="flex items-center gap-2 text-sm text-gray-700"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-[#2a9d8f]"></div>
                                                    {highlight}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            onClick={() => onSelectPersona(persona.id)}
                                            className={`w-full bg-gradient-to-r ${persona.color} hover:opacity-90 text-white py-6 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200`}
                                        >
                                            <MessageCircle className="mr-2 h-5 w-5" />
                                            Start Learning with {persona.name.split(' ')[0]}
                                        </Button>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
                        <CardContent className="p-8">
                            <Globe className="h-12 w-12 mx-auto mb-4 text-[#e9c46a]" />
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Can't decide?
                            </h3>
                            <p className="text-white/80 mb-4">
                                Both mentors are available 24/7 and can help with overlapping topics.
                                You can always switch between them during your learning journey.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}