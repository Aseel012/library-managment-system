export default function VideoBanner() {
  return (
    <div className="row row--first !border-t-0">
      <div className="col">
        <div className="relative w-full aspect-[16/7] min-h-[180px] max-h-[420px] overflow-hidden bg-[var(--bg-3)]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/banner.jpg"
          >
            <source src="/images/banner_vid.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}
