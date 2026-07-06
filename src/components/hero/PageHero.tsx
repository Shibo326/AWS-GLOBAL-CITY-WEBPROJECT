import Image from 'next/image';
import WaveDivider from '@/components/zones/WaveDivider';

interface PageHeroProps {
  title: string;
  subtitle: string;
  roryVariant?: 'waving' | 'curious';
  nextZoneColor: string;
}

/**
 * PageHero — Reusable inner-page hero banner.
 * Renders a sky zone section with centered title, subtitle,
 * Rory mascot with float animation, and a WaveDivider at the bottom.
 */
export default function PageHero({
  title,
  subtitle,
  roryVariant = 'waving',
  nextZoneColor,
}: PageHeroProps) {
  const imageSrc =
    roryVariant === 'curious'
      ? '/images/rory-curious.png'
      : '/images/rory-waving.png';

  const imageAlt =
    roryVariant === 'curious'
      ? 'Rory the tiger mascot looking curious'
      : 'Rory the tiger mascot waving';

  return (
    <section className="zone-sky zone-section py-16 md:py-20 lg:py-24">
      <div className="flex flex-col items-center text-center px-6">
        {/* Rory mascot with float animation */}
        <div className="float-rory">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={160}
            height={160}
            className="h-[120px] lg:h-[160px] w-auto"
            priority
          />
        </div>

        {/* Title */}
        <h1
          className="mt-6 text-4xl md:text-5xl lg:text-6xl uppercase"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className="mt-3 text-lg md:text-xl max-w-2xl"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {subtitle}
        </p>
      </div>

      {/* WaveDivider transitioning to next zone */}
      <WaveDivider type={2} fillColor={nextZoneColor} />
    </section>
  );
}
