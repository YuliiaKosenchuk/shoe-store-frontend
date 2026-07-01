"use client";

import Link from "next/link";
import { Container } from "../ui/Container";

export type MegaMenuLink = { label: string; href: string };
export type MegaMenuFeatured = { name: string; image: string; href: string };

export type MegaMenuData = {
  categories?: MegaMenuLink[];
  categoriesLabel?: string;
  secondary?: MegaMenuLink[];
  handpicked?: MegaMenuLink[];
  featured?: MegaMenuFeatured[];
};

type Props = {
  data: MegaMenuData;
  onClose: () => void;
};

const linkCls =
  "w-fit text-[14px] leading-normal font-normal text-black relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:origin-left after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100";

export default function MegaMenu({ data, onClose }: Props) {
  const hasSidebar = data.categories || data.secondary || data.handpicked;
  const hasFeatured = data.featured && data.featured.length > 0;

  return (
    <div className="absolute left-0 right-0 top-full w-full bg-white border-b border-[#EBEBEB]">
      <Container>
        <div className="flex justify-between py-10 px-8">
          {/* Links block — left side */}
          {hasSidebar && (
            <div className="flex gap-x-28">
              {/* Categories + secondary */}
              <div>
                {data.categories && (
                  <>
                    <p className="text-[16px] font-medium leading-[1.3] text-black mb-8">{data.categoriesLabel ?? "Categories"}</p>
                    <div className="flex flex-col gap-4">
                      {data.categories.map((link) => (
                        <Link key={link.label} href={link.href} onClick={onClose} className={linkCls}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
                {data.secondary && (
                  <div className="flex flex-col gap-4 mt-16">
                    {data.secondary.map((link) => (
                      <Link key={link.label} href={link.href} onClick={onClose} className={linkCls}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Handpicked */}
              {data.handpicked && (
                <div>
                  <p className="text-[16px] font-medium leading-[1.3] text-black mb-8">Handpicked</p>
                  <div className="flex flex-col gap-4">
                    {data.handpicked.map((link) => (
                      <Link key={link.label} href={link.href} onClick={onClose} className={linkCls}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Featured products — right side */}
          {hasFeatured && (
            <div className="flex gap-x-6">
              {data.featured!.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  onClick={onClose}
                  className="group"
                >
                  <div className="bg-[#F2EDE6] w-75 h-100 overflow-hidden">
                    {product.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <p className="mt-3 text-[16px] leading-[1.3] font-normal text-black transition-colors duration-200 group-hover:text-[#7A2633]">{product.name}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
