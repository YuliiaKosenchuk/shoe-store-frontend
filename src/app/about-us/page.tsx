import Image from "next/image";
import { Languages, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Our Team | ATELIER",
};

type SocialType =
  | "telegram"
  | "linkedin"
  | "behance"
  | "github"
  | "instagram"
  | "email"
  | "swagger"
  | "discord";

type SocialLink = {
  type: SocialType;
  url: string;
};

type TeamMember = {
  name: string;
  role: string;
  quote: string;
  location: string;
  achievements: string[];
  skills: string[];
  photo?: string;
  socials: SocialLink[];
};

const SOCIAL_CONFIG: Record<
  SocialType,
  {
    label: string;
    icon?: LucideIcon;
    iconSrc?: string;
    text?: string;
    textClassName?: string;
    /** Size (px) for the icon/image; overrides the default 24 */
    iconSize?: number;
    /** Extra classes applied to the icon/image */
    iconClassName?: string;
    /** Extra classes applied to the surrounding <a> */
    wrapperClassName?: string;
  }
> = {
  telegram: { label: "Telegram", icon: Send },
  linkedin: {
    label: "LinkedIn",
    iconSrc: "/images/social/linkedin.svg",
    iconClassName: "w-8 h-8",
  },
  behance: { label: "Behance", iconSrc: "/images/social/bechance.svg" },
  github: {
    label: "GitHub",
    iconSrc: "/images/social/github.svg",
    iconClassName: "-ml-1 w-5 h-6",
  },
  instagram: { label: "Instagram", text: "Ig" },
  email: {
    label: "Email",
    iconSrc: "/images/social/email.svg",
    iconClassName: "w-6 h-6",
  },
  swagger: { label: "Swagger", text: "Sw" },
  discord: { label: "Discord", iconSrc: "/images/social/discord.svg" },
};

const stats = [
  { icon: Languages, value: "International", label: "Team" },
  { iconSrc: "/images/icons/team.svg", value: "6", label: "Team members" },
  {
    iconSrc: "/images/icons/student.svg",
    value: "Mate Academy",
    label: "School",
  },
  {
    iconSrc: "/images/icons/globe.svg",
    value: "Remote",
    label: "Collaboration",
  },
];

const team: TeamMember[] = [
  {
    name: "Tamara Kocherzhenko",
    role: "Project Manager",
    quote: "Turning ideas into successful products, together.",
    location: "Nessebar, Bulgaria",
    photo: "/images/members/tamara2.jpg",
    achievements: [
      "Managed end-to-end project delivery.",
      "Coordinated cross-functional teams.",
      "Managed project scope, timelines and priorities across multiple workstreams.",
      "Planned and facilitated sprint ceremonies, ensuring smooth Agile delivery.",
      "Identified and mitigated project risks to keep delivery on schedule.",
      "Improved team workflows and communication, increasing delivery efficiency.",
    ],
    skills: ["Jira", "Notion", "Figma"],
    socials: [
      {
        type: "linkedin",
        url: "https://ua.linkedin.com/in/tamara-kocherzenko",
      },
    ],
  },
  {
    name: "Yana Antoniuk",
    role: "Data Analyst",
    quote: "Data tells the story behind every business decision.",
    location: "United Kingdom, remote",
    photo: "/images/members/yana.png",
    achievements: [
      "Delivered data analysis that shaped key product decisions — from audience hypotheses to backlog priorities",
      "Built 5 interactive Tableau dashboards covering sales, traffic, products and delivery",
      "Designed the database architecture from scratch — 11 tables — alongside the backend developer",
      "Ran 4 statistically significant A/B tests on checkout and authentication flows",
      "Analysed 10+ competitors across the market to shape product positioning",
    ],
    skills: ["SQL", "Python", "Power BI"],
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/yana-a-9a664339b?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      },
      { type: "github", url: "https://github.com/Yanaantonyuk" },
    ],
  },
  {
    name: "Alona Zertsova",
    role: "UI/UX Designer",
    quote: "Design should make shopping effortless.",
    location: "Varna, Bulgaria",
    photo: "/images/members/alona1.jpg",
    achievements: [
      "Conducted competitor and reference analysis to define the visual direction.",
      "Developed the website structure, user flows, and navigation logic.",
      "Created the visual concept, including typography, fonts, color palette, and UI style.",
      "Designed 100+ frames, including responsive layouts for different devices.",
      "Developed a comprehensive UI Kit with reusable components to ensure consistency and support future product scalability.",
    ],
    skills: ["Figma", "Illustrator", "Miro", "Notion"],
    socials: [
      { type: "linkedin", url: "https://bg.linkedin.com/in/%D0%B0%D0%BB%D0%B5%D0%BD%D0%B0-%D0%B7%D0%B5%D1%80%D1%86%D0%BE%D0%B2%D0%B0-303462342" },
      { type: "behance", url: "https://www.behance.net/bb486191" },
    ],
  },
  {
    name: "Wojciech Andziak",
    role: "Backend Developer",
    quote: "A reliable backend is the backbone of a great experience.",
    location: "Łódź, Poland",
    photo: "/images/members/wojtec.jpeg",
    achievements: [
      "Designed and developed the complete REST API with Java and Spring Boot.",
      "Implemented authentication, shopping cart, orders, discounts, and Stripe payments.",
      "Integrated Google OAuth2, Brevo email services, session tracking, and CSV importers.",
      "Deployed the backend and PostgreSQL on a VPS using Docker and Nginx Proxy Manager.",
    ],
    skills: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Liquibase",
      "REST API",
      "JWT",
      "OAuth2",
      "Stripe",
      "Docker",
      "Swagger",
      "Linux / VPS",
    ],
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/wojciech-andziak/",
      },
      { type: "github", url: "https://github.com/Wojtek-A-JAVA" },
      { type: "email", url: "mailto:wojciech.andziak@gmail.com" },
      {
        type: "swagger",
        url: "https://shoe-store.andziak.pl/swagger-ui/index.html#/",
      },
    ],
  },
  {
    name: "Yuliia Kosenchuk",
    role: "Frontend Developer",
    quote: "Making complex interfaces feel simple.",
    location: "Europe, remote",
    photo: "/images/members/yuliia.png",
    achievements: [
      "Engineered a mobile-first responsive storefront UI.",
      "Designed and implemented a comprehensive UI component system.",
      "Improved application rendering speed through code splitting, lazy loading, and asset optimization.",
      "Integrated RESTful APIs and managed complex client-side state.",
      "AI-Assisted Development",
    ],
    skills: [
      "JS",
      "TS",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Motion",
      "Zustand",
      "Axios",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Vercel",
      "Claude Code",
    ],
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/yuliia-kosenchuk/",
      },
      { type: "github", url: "https://github.com/YuliiaKosenchuk" },
      { type: "email", url: "mailto:yuliia.kosenchuk@gmail.com" },
      { type: "discord", url: "https://discord.com/users/1249428703256248491" },
    ],
  },
  {
    name: "Łucja Chmist",
    role: "QA Tester",
    quote: "Quality is what turns good products into trusted ones.",
    location: "Gdańsk, Poland",
    achievements: [
      "Created 500+ test cases for web, mobile, and API applications",
      "Reported 50+ bugs in Jira and verified implemented fixes",
      "Performed manual testing of web, mobile, and API applications",
      "Prepared test documentation, including test plans, checklists, bug reports, RTMs, and decision tables",
    ],
    skills: ["Cypress", "Jest", "Postman"],
    socials: [
      { type: "linkedin", url: "www.linkedin.com/in/łucja-chmist-b204672b9" },
      {
        type: "email",
        url: "mailto:chmistlucja@gmail.com",
      },
    ],
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function AboutUsPage() {
  return (
    <main className="pb-7">
      {/* Hero — full page width, outside the shared Container */}
      <div className="w-full grid gap-y-8 xl:grid-cols-[560px_1fr] 3xl:grid-cols-[650px_1fr] xl:gap-x-20 items-center mb-12 px-4 xl:pr-0 xl:pl-[max(2rem,calc((100vw-1344px)/2+2rem))]">
        <div>
          <h1
            className="text-[64px] leading-[1.1] tracking-tight text-black mb-8"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            A student project.
            <br />
            Built by a real team.
          </h1>
          <div className="flex flex-col md:flex-row md:flex-wrap md:items-start md:gap-12 xl:flex-col xl:flex-nowrap xl:gap-0">
            <div
              className="flex flex-col gap-4 text-[16px] leading-[1.3] text-[#4E4E4E] max-w-140 mb-10 md:mb-0 md:min-w-0 xl:mb-10"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              <p>
                Fashion Marketplace is a conceptual e-commerce platform created
                as a graduation project at Mate Academy.
              </p>
              <p>
                Our goal was to design and build a modern online shopping
                experience from research and UX strategy to development, testing
                and analytics
              </p>
              <p>
                This project was created by a multidisciplinary team of six
                students who collaborated as if working in a real product
                company.
              </p>
            </div>
            <div className="grid grid-rows-2 grid-flow-col gap-x-8 gap-y-4 md:max-w-120 md:shrink-0">
              {stats.map(({ icon: Icon, iconSrc, value, label }) => (
                <div key={label} className="flex items-center gap-4">
                  {Icon ? (
                    <Icon size={24} strokeWidth={1.25} className="text-black" />
                  ) : iconSrc ? (
                    <Image src={iconSrc} alt="" width={24} height={24} />
                  ) : null}
                  <div className="flex flex-col">
                    <span
                      className="font-serif text-[18px] leading-[1.3] font-light text-[#010101]"
                      style={{ fontFamily: "var(--font-cormorant-garamond))" }}
                    >
                      {value}
                    </span>
                    <span
                      className="text-[14px] leading-normal text-[#4E4E4E]"
                      style={{ fontFamily: "var(--font-jost)" }}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden h-72 md:h-[550px] xl:h-[700px]">
          <Image
            src="/images/about2.png"
            alt="Our team at work"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      <Container>
        <div className="px-4 md:px-8">
          {/* Team grid */}
          <div className="mb-8">
            <h2
              className="text-[36px] leading-[1.1] tracking-tight text-black mb-6"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              The people behind the project
            </h2>
            <p
              className="text-[16px] text-[#343434]"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Six roles. One vision. A shared passion for creating excellent
              digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[881px]:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7">
            {team.map((member, i) => (
              <article
                key={i}
                className="grid grid-rows-subgrid row-span-4 border border-[#E8E8E8] p-4"
              >
                <div className="flex gap-4 items-start justify-between">
                  <div className="relative flex  h-37.25 w-37.25 items-center justify-center overflow-hidden rounded-full bg-[#F8F8F8] shrink-0">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="149px"
                      />
                    ) : (
                      <span
                        className="text-6xl uppercase text-black"
                        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                      >
                        {initials(member.name)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span
                      className="inline-block mb-4 bg-[#7A2633] text-white text-[16px] leading-[1.3] tracking-widest px-4 py-2 rounded-full"
                      style={{ fontFamily: "var(--font-jost)" }}
                    >
                      {member.role}
                    </span>
                    <h3
                      className="text-[26px] text-semibold leading-[1.2] text-black mb-4"
                      style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="text-[14px] leading-normal text-[#4E4E4E] mb-4"
                      style={{ fontFamily: "var(--font-jost)" }}
                    >
                      &ldquo;{member.quote}&rdquo;
                    </p>
                    <p
                      className="text-[14px] leading-normal text-[#4E4E4E]"
                      style={{ fontFamily: "var(--font-jost)" }}
                    >
                      Location:{" "}
                      <span className="font-medium text-black">
                        {member.location}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <p
                    className="text-[16px] leading-[1.3] text-medium tracking-widest text-black mb-2"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Key Contributions
                  </p>
                  <ul className="flex flex-col gap-1">
                    {member.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="ml-2 flex items-start gap-2 text-[14px] text-[#4E4E4E] leading-normal"
                        style={{ fontFamily: "var(--font-jost)" }}
                      >
                        <span className="mt-1.5 h-1.25 w-1.25 shrink-0 rounded-full bg-black" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p
                    className="text-[16px] leading-[1.3] text-medium tracking-widest text-black mb-4"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Tools &amp; Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[14px] leading-normal text-[#010101] bg-[#F8F8F8] p-2"
                        style={{ fontFamily: "var(--font-jost)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p
                    className="text-[16px] leading-[1.3] text-medium tracking-widest text-black mb-4"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Links
                  </p>
                  <div className="flex gap-2">
                    {member.socials.map((social) => {
                      const config = SOCIAL_CONFIG[social.type];
                      const Icon = config.icon;
                      const iconSize = config.iconSize ?? 24;
                      return (
                        <a
                          key={social.type}
                          href={social.url}
                          target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                          rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                          aria-label={config.label}
                          className={`flex h-8 w-8 items-center justify-center bg-black text-white text-[11px] font-medium hover:opacity-80 transition-opacity ${config.wrapperClassName ?? ""}`}
                          style={{ fontFamily: "var(--font-jost)" }}
                        >
                          {Icon ? (
                            <Icon
                              size={iconSize}
                              strokeWidth={1.5}
                              className={config.iconClassName}
                            />
                          ) : config.iconSrc ? (
                            <Image
                              src={config.iconSrc}
                              alt={config.label}
                              width={iconSize}
                              height={iconSize}
                              className={`invert ${config.iconClassName ?? ""}`}
                            />
                          ) : (
                            <span
                              className={`text-[16px] ${config.textClassName ?? ""}`}
                            >
                              {config.text}
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
