import { Helmet } from "react-helmet-async";

export function GalleryPage() {
  return (
    <>
      <Helmet>
        <title>Gallery | Tafheem-ul-Islam Trust</title>
        <meta
          name="description"
          content="View our gallery of humanitarian work and care for the community."
        />
      </Helmet>
      <main className="flex-grow flex flex-col gap-8 md:gap-20 px-4 sm:px-6 lg:px-20 w-full mx-auto pt-4 md:pt-12 pb-12 md:pb-24">
        <section className="bg-[#0a301d] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-6 md:gap-8 text-center relative overflow-hidden">
          <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] text-white font-bold leading-[1.1] tracking-tight relative z-10 w-full max-w-3xl mx-auto">
            Our Gallery
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto relative z-10">
            A visual journey of our humanitarian impact across communities.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
          {[
            "https://images.pexels.com/photos/6646923/pexels-photo-6646923.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/13959931/pexels-photo-13959931.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/8078401/pexels-photo-8078401.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/37234478/pexels-photo-37234478.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/7142505/pexels-photo-7142505.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/29851269/pexels-photo-29851269.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/35872865/pexels-photo-35872865.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/20356942/pexels-photo-20356942.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
          ].map((src, index) => (
            <div
              key={index}
              className="w-full aspect-square rounded-[16px] sm:rounded-[24px] overflow-hidden group"
            >
              <img
                src={src}
                alt={"Gallery image " + (index + 1)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
