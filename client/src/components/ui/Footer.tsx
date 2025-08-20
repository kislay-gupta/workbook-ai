import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Twitter, Terminal } from "lucide-react"
import { Toast } from "./Toast"
import { useState } from "react"

const socialLinks = [
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/kislay-gupta",
        icon: Linkedin,
        color: "hover:text-blue-500"
    },
    {
        name: "GitHub",
        url: "https://github.com/kislay-gupta",
        icon: Github,
        color: "hover:text-gray-300"
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/kissslayyy/",
        icon: Instagram,
        color: "hover:text-pink-500"
    },
    {
        name: "Twitter",
        url: "https://x.com/Kissslayyy",
        icon: Twitter,
        color: "hover:text-blue-400"
    }
]

const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const
        }
    }
}

const iconVariants = {
    hover: {
        scale: 1.2,
        y: -2,
        transition: {
            type: "spring" as const,
            stiffness: 300
        }
    }
}

export function Footer() {
    const [showToast, setShowToast] = useState(false)

    const handleNpxCommand = async () => {
        try {
            await navigator.clipboard.writeText("npx kislay-gupta")
            setShowToast(true)
        } catch (err) {
            console.error('Failed to copy to clipboard:', err)
        }
    }

    return (
        <>
            <Toast
                message="Command copied to clipboard!"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
            <motion.footer
                variants={footerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border-t border-white/10 mt-auto"
            >
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center space-y-6">
                        {/* Main content */}
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Built with ❤️ by Kislay Gupta
                            </h3>
                            <p className="text-white/70 text-sm mb-4">
                                Full Stack Developer & AI Enthusiast
                            </p>

                            {/* NPX Command */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleNpxCommand}
                                className="inline-flex items-center gap-2 bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-full cursor-pointer transition-colors"
                            >
                                <Terminal className="h-4 w-4" />
                                <code className="text-sm">npx kislay-gupta</code>
                            </motion.div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-6">
                            {socialLinks.map((link) => {
                                const IconComponent = link.icon
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variants={iconVariants}
                                        whileHover="hover"
                                        className={`text-white/70 ${link.color} transition-colors`}
                                        aria-label={link.name}
                                    >
                                        <IconComponent className="h-6 w-6" />
                                    </motion.a>
                                )
                            })}
                        </div>

                        {/* Copyright */}
                        <div className="text-center text-white/50 text-sm">
                            <p>&copy; {new Date().getFullYear()} Kislay Gupta. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </motion.footer>
        </>
    )
}