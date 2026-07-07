import Link from "next/link";

export default function TopBar() {
  return (
    <div className="w-full h-6 bg-black flex items-center justify-center">
      <p className="font-(family-name:--font-jost) text-[14px] font-normal text-[#DADADA] leading-none">
        Free shipping on orders 50 EUR&nbsp;&nbsp;
        <Link
          href="/legal#shipping"
          className="pl-4 underline underline-offset-2 hover:text-white transition-colors"
        >
          Learn more
        </Link>
      </p>
    </div>
  );
}
