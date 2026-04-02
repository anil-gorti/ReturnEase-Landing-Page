type BrandLogoProps = {
  compact?: boolean;
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <img
      src="/logo-variants/logo-variant-04-seal-wordmark.svg"
      alt="RETURNEASE"
      className={`h-auto select-none ${compact ? 'w-[172px]' : 'w-[236px]'}`}
    />
  );
}
