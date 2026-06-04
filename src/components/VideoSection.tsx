export function VideoSection() {
  return (
    <section className="w-full">
      <div className="w-full aspect-video rounded-[16px] md:rounded-[32px] overflow-hidden bg-surface-container-high border border-outline-variant/30">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
          frameBorder="0"
          src="https://www.youtube.com/embed/lQVRG19h8hg"
          title="YouTube video player"
        ></iframe>
      </div>
    </section>
  );
}
