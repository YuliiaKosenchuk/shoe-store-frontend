import Link from "next/link";

export default function TopBar() {
  return (
    <div className="w-full h-6 bg-[#F8F8F8] flex items-center justify-center">
      <p className="font-(family-name:--font-jost) text-[14px] font-medium text-[#010101] leading-none">
        Further reductions - up to 20% Off&nbsp;&nbsp;
        <Link
          href="/sale"
          className="pl-4 underline underline-offset-2 hover:text-[#7A2633] transition-colors"
        >
          Learn more
        </Link>
      </p>
    </div>
  );
}
