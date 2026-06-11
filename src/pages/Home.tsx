import { Helmet } from "react-helmet-async";
import { Hero } from "../components/Hero";
import { Partners } from "../components/Partners";
import { Mission } from "../components/Mission";
import { VideoSection } from "../components/VideoSection";
import { Metrics } from "../components/Metrics";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";

export function Home() {
  return (
    <>
      <Helmet>
        <title>Tafheem-ul-Islam Trust | Changing Lives</title>
        <meta name="description" content="Tafheem-ul-Islam Trust is a humanitarian and charitable organization based in Anantnag district, Jammu and Kashmir, India, serving humanity." />
      </Helmet>
      <main className="flex-grow flex flex-col gap-8 md:gap-20 px-4 sm:px-6 lg:px-20 w-full mx-auto pt-4 md:pt-12 pb-12 md:pb-24">
        <Hero />
        <Partners />
        <Mission />
        <VideoSection />
        <Metrics />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
