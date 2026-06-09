import Link from "next/link";

export function Header() {
  return (
    <header className="relative flex items-center justify-center border-b border-gray-200 bg-white px-6 py-4">
      <Link
        href="/"
        className="absolute left-6 flex items-center gap-1.5 text-[11px] font-medium tracking-widest text-gray-600 uppercase hover:text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
      </Link>
      <span className="font-serif text-lg tracking-wide text-gray-900">Sharman</span>
    </header>
  );
}