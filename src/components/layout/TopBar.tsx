import Link from "next/link";

export default function TopBar() {
  return (
    <div className="w-full h-6 bg-[#1C1C1C] flex items-center justify-center">
      <p className="font-(family-name:--font-jost) text-[14px] font-light text-[#DADADA] leading-none">
        Free shipping on orders 5000 UAH&nbsp;&nbsp;
        <Link
          href="/legal#shipping"
          className="underline underline-offset-2 hover:text-white transition-colors"
        >
          Learn more
        </Link>
      </p>
    </div>
  );
}
