import Awards from "@/sections/home/Awards/Awards";
import Collaborations from "@/sections/home/Collaborations/Collaborations";
import Enquiry from "@/sections/home/Enquiry/Enquiry";
import Hero from "@/sections/home/Hero/Hero";
import LifeAtTulas from "@/sections/home/LifeAtTulas/LifeAtTulas";
import ParentVoices from "@/sections/home/ParentVoices/ParentVoices";
import Personalities from "@/sections/home/Personalities/Personalities";
import Rankings from "@/sections/home/Rankings/Rankings";
import Sports from "@/sections/home/Sports/Sports";
import StudentStories from "@/sections/home/StudentStories/StudentStories";
import VirtualTour from "@/sections/home/VirtualTour/VirtualTour";
import WhyTIS from "@/sections/home/WhyTIS/WhyTIS";

// Reads as the page outline, top to bottom.
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <LifeAtTulas />
      <StudentStories />
      <Sports />
      <WhyTIS />
      <Rankings />
      <Personalities />
      <Awards />
      <VirtualTour />
      <ParentVoices />
      <Collaborations />
      <Enquiry />
    </main>
  );
}
