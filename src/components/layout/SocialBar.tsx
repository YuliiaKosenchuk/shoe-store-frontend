import Link from "next/link";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 8h-2a2 2 0 0 0-2 2v10M9 13h6" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.177 2.618 7.739 6.323 9.13-.087-.757-.166-1.92.034-2.746.182-.744 1.22-5.167 1.22-5.167s-.312-.624-.312-1.547c0-1.449.84-2.533 1.883-2.533.888 0 1.319.667 1.319 1.467 0 .894-.57 2.232-.864 3.473-.246 1.037.52 1.882 1.539 1.882 1.848 0 3.274-1.948 3.274-4.762 0-2.49-1.79-4.23-4.345-4.23-2.96 0-4.698 2.22-4.698 4.513 0 .894.344 1.852.773 2.375.085.104.097.195.072.3-.079.326-.255 1.037-.29 1.182-.046.19-.153.23-.352.138-1.317-.614-2.14-2.544-2.14-4.093 0-3.328 2.418-6.387 6.975-6.387 3.661 0 6.508 2.609 6.508 6.094 0 3.637-2.292 6.562-5.474 6.562-1.07 0-2.077-.556-2.42-1.211l-.657 2.455c-.238.916-.88 2.063-1.31 2.763.987.305 2.032.47 3.116.47C17.523 22 22 17.523 22 12S17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function SocialBar() {
  return (
    <div className="w-full">
      <div className="max-w-336 mx-auto px-8 flex items-center gap-4 h-10">
        <span
          className="uppercase tracking-widest text-[#999] shrink-0"
          style={{ fontFamily: "var(--font-jost)", fontSize: "11px" }}
        >
          leather collection
        </span>
        <div className="flex-1 h-px bg-[#D9D2C8]" />
        <div className="flex items-center gap-4 shrink-0">
          {socials.map(({ label, href, icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#999] hover:text-black transition-colors duration-200"
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
