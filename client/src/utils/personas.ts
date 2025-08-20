export interface PersonaInfo {
  name: string;
  title: string;
  description: string;
  color: string;
  accent: string;
  image: string;
}
import hitesh from "@/assets/hitesh_sir.jpg";
import piyush from "@/assets/piyushGarg.jpg";
export const personaConfigs: Record<string, PersonaInfo> = {
  hitesh: {
    name: "Hitesh Choudhary",
    title: "Tech Educator & YouTuber",
    description: "15+ years experience • 16,00,000+ students taught",
    color: "from-[#2a9d8f] to-[#264653]",
    accent: "#e9c46a",
    image: hitesh,
  },
  piyush: {
    name: "Piyush Garg",
    title: "System Design Expert & Developer",
    description: "Founder of Teachyst • 10,000+ students",
    color: "from-[#f4a261] to-[#e76f51]",
    accent: "#2a9d8f",
    image: piyush,
  },
};

export const getPersonaConfig = (persona?: string): PersonaInfo => {
  return personaConfigs[persona || "hitesh"] || personaConfigs.hitesh;
};
