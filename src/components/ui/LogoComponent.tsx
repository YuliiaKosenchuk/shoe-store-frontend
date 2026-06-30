import Image from 'next/image';
import Link from 'next/link';

export default function LogoComponent() {
  return (
    <div className="flex justify-center">
      <Link
        href="/"
        className="group font-serif text-xl tracking-wide"
      >
        <Image
          src="/Frame 477 (3).svg"
          alt="Atelier logo"
          width={210}
          height={41}
          className="transition-all duration-300 w-52.5 h-auto group-hover:opacity-70"
          priority
        />
      </Link>
    </div>
  );
}

