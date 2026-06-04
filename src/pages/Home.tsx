import { Hero } from "../components/Hero";
import { Partners } from "../components/Partners";
import { Mission } from "../components/Mission";
import { VideoSection } from "../components/VideoSection";
import { Metrics } from "../components/Metrics";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";

export function Home() {
  return (
    <main className="flex-grow flex flex-col gap-12 md:gap-20 px-4 sm:px-6 lg:px-20 w-full mx-auto pt-6 md:pt-12 pb-16 md:pb-24">
      <Hero />
      <Partners />
      <Mission />
      <VideoSection />
      <Metrics />
      <FAQ />
      <Contact />
    </main>
  );
}
