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
          className="transition-all duration-300"
          style={{ height: 'auto' }}
          priority
        />
      </Link>
      {/* <Link
        href="/"
        // text-black: колір за замовчуванням
        // hover:text-[#7A2633]: колір при наведенні
        // transition-colors: для плавної анімації кольору
        // serif text-xl tracking-wide uppercase: зберігають оригінальний стиль
        className="select-none inline-block font-serif text-xl tracking-wide uppercase text-black hover:text-[#7A2633] transition-colors duration-300"
      >
        Atelier
      </Link> */}
    </div>
  );
}

