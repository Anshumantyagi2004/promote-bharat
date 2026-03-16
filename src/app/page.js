import AboutSection from "@/components/Home/About";
import Carousel from "@/components/Home/Carousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center bg-zinc-50 font-san">
      <Carousel />
      <AboutSection />
    </div>
  );
}
