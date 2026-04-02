type BrandLogoProps = {
  compact?: boolean;
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="w-10 h-10 border-2 border-ink bg-white flex items-center justify-center shadow-solid-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-7 h-7"
          role="img"
          aria-label="ReturnEase logo">
          <path
            d="M14 24h18c7.2 0 13 5.8 13 13s-5.8 13-13 13H14"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="4"
            strokeLinecap="square"
          />
          <path
            d="M21 18l-8 6 8 6"
            fill="none"
            stroke="#D97706"
            strokeWidth="4"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block font-serif text-ink tracking-[0.02em] ${compact ? 'text-2xl' : 'text-3xl'}`}>
          ReturnEase
        </span>
        {!compact && (
          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">
            Return Protocol System
          </span>
        )}
      </span>
    </div>
  );
}
