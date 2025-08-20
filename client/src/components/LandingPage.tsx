import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Sparkles, Users, Zap, ArrowRight, Star, } from "lucide-react"
import { personaConfigs } from "@/utils/personas"
import { useNavigate } from "react-router"
import { Footer } from "./ui/Footer"

interface LandingPageProps {
    onStartChat: () => void
    onViewPersonas: () => void
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        y: -10,
        scale: 1.05,
        transition: {
            type: "spring" as const,
            stiffness: 300
        }
    }
}

export function LandingPage({ onStartChat, onViewPersonas }: LandingPageProps) {
    const navigate = useNavigate()
    return (
        <div className="bg-gradient-to-br from-[#264653] via-[#2a9d8f] to-[#e9c46a]">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center text-white mb-16"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-[#e9c46a] bg-clip-text text-transparent"
                    >
                        Persona AI
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
                    >
                        Experience conversations with AI personalities tailored to your needs.
                        From creative writing to technical support, find the perfect AI companion.
                    </motion.p>
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={onStartChat}
                                size="lg"
                                className="bg-[#f4a261] hover:bg-[#e76f51] text-white text-lg px-8 py-6 rounded-full shadow-lg"
                            >
                                <MessageCircle className="mr-2 h-6 w-6" />
                                Start Chatting
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={onViewPersonas}
                                variant="outline"
                                size="lg"
                                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full backdrop-blur-sm"
                            >
                                <Users className="mr-2 h-6 w-6" />
                                Meet Our Mentors
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Personas Preview */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-16"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Meet Your AI Mentors
                        </h2>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto">
                            Learn from industry experts who have taught millions of students worldwide
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
                        <motion.div onClick={() => navigate("/chat/hitesh")} variants={cardVariants} whileHover="hover">
                            <Card className="bg-white/10 cursor-pointer backdrop-blur-sm border-white/20 text-white overflow-hidden">
                                <div className="bg-gradient-to-r from-[#2a9d8f] to-[#264653] p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden flex items-center justify-center">
                                            <img
                                                src={personaConfigs.hitesh.image}
                                                alt="Hitesh Choudhary avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Hitesh Choudhary</h3>
                                            <p className="text-white/90">Tech Educator & YouTuber</p>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <p className="text-white/90 mb-4">
                                        15+ years experience • 16,00,000+ students taught • Founder of ChaiCode
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {["Web Dev", "JavaScript", "React", "Career Guidance"].map((skill) => (
                                            <span key={skill} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-[#e9c46a]">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="text-sm">950k+ YouTube subscribers</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div onClick={() => navigate("/chat/piyush")} variants={cardVariants} whileHover="hover">
                            <Card className="bg-white/10 backdrop-blur-sm cursor-pointer border-white/20 text-white overflow-hidden">
                                <div className="bg-gradient-to-r from-[#f4a261] to-[#e76f51] p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden flex items-center justify-center">
                                            <img
                                                src={personaConfigs.piyush.image}
                                                alt="Piyush Garg avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Piyush Garg</h3>
                                            <p className="text-white/90">Popular Tech YouTuber</p>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <p className="text-white/90 mb-4">
                                        25 years old • 10,000+ students • Founder of Teachyst
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {["System Design", "Microservices", "DevOps", "Full Stack"].map((skill) => (
                                            <span key={skill} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-[#e9c46a]">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="text-sm">Popular Tech YouTuber</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="text-center">
                        <Button
                            onClick={onViewPersonas}
                            variant="outline"
                            className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-3 rounded-full backdrop-blur-sm"
                        >
                            View All Mentors
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-3 gap-8 mb-16"
                >
                    <motion.div variants={cardVariants} whileHover="hover">
                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                            <CardHeader className="text-center">
                                <Sparkles className="h-12 w-12 mx-auto mb-4 text-[#e9c46a]" />
                                <CardTitle className="text-xl">Expert Personas</CardTitle>
                                <CardDescription className="text-white/80">
                                    Choose from industry-leading AI personalities, each with unique expertise and teaching styles
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                            <CardHeader className="text-center">
                                <Zap className="h-12 w-12 mx-auto mb-4 text-[#f4a261]" />
                                <CardTitle className="text-xl">Instant Learning</CardTitle>
                                <CardDescription className="text-white/80">
                                    Get quick, intelligent responses powered by advanced AI technology and real expertise
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                            <CardHeader className="text-center">
                                <Users className="h-12 w-12 mx-auto mb-4 text-[#e76f51]" />
                                <CardTitle className="text-xl">Personalized</CardTitle>
                                <CardDescription className="text-white/80">
                                    Each conversation adapts to your learning style and experience level
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center"
                >
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Ready to start learning?
                            </h2>
                            <p className="text-white/80 mb-6">
                                Join thousands of developers learning from the best AI mentors in the industry
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={onStartChat}
                                        className="bg-[#2a9d8f] hover:bg-[#264653] text-white px-6 py-3 rounded-full"
                                    >
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Start Learning Now
                                    </Button>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={onViewPersonas}
                                        variant="outline"
                                        className="bg-transparent border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full"
                                    >
                                        <Users className="mr-2 h-4 w-4" />
                                        Explore Mentors
                                    </Button>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            <Footer />
        </div>
    )
}