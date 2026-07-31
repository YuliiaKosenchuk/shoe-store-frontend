import Image from "next/image";
import { Users, GraduationCap, Globe, Send, Mail } from "lucide-react";
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
  }
> = {
  telegram: { label: "Telegram", icon: Send },
  linkedin: { label: "LinkedIn", iconSrc: "/images/social/linkedin.svg" },
  behance: { label: "Behance", iconSrc: "/images/social/bechance.svg" },
  github: { label: "GitHub", iconSrc: "/images/social/github.svg" },
  instagram: { label: "Instagram", text: "Ig" },
  email: { label: "Email", icon: Mail },
  swagger: { label: "Swagger", text: "Sw" },
  discord: { label: "Discord", iconSrc: "/images/social/discord.svg" },
};

const stats = [
  { icon: Users, value: "6", label: "Team members" },
  { icon: GraduationCap, value: "Mate Academy", label: "School" },
  { icon: Globe, value: "Remote", label: "Collaboration" },
];

const team: TeamMember[] = [
  {
    name: "Tamara Kocherzhenko",
    role: "Product Manager",
    quote: "Great products start with understanding the customer's journey.",
    location: "TBD",
    achievements: [
      "Defined product roadmap & vision",
      "Prioritized backlog with stakeholders",
      "Ran user research & discovery",
      "Coordinated cross-team delivery",
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
    location: "TBD",
    achievements: [
      "Built sales & conversion dashboards",
      "Analyzed customer behavior trends",
      "Automated reporting pipelines",
      "Ran A/B testing experiments",
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
    achievements: [
      "Designed 50+ screens",
      "Created design system & UI kit",
      "Conducted UX research",
      "Built interactive prototypes",
    ],
    skills: ["Figma", "Illustrator", "Miro"],
    socials: [
      { type: "behance", url: "#" },
      { type: "linkedin", url: "#" },
    ],
  },
  {
    name: "Wojciech Andziak",
    role: "Backend Developer",
    quote: "A reliable backend is the backbone of a great experience.",
    location: "Łódź, Poland",
    photo: "/images/members/wojtec.jpeg",
    achievements: [
      "Designed and developed the complete REST API using Java, Spring Boot, Spring Security, and PostgreSQL.",
      "Implemented authentication and authorization, shopping cart, orders, discount codes, Stripe payments, and webhook handling.",
      "Integrated Google OAuth2, Brevo email services, password reset, session tracking, and CSV data importers.",
      "Deployed and maintained the backend and PostgreSQL database on a VPS using Docker and Nginx Proxy Manager.",
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
      { type: "github", url: "https://github.com/Wojtek-A-JAVA" },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/wojciech-andziak/",
      },
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
    ],
    skills: [
      "JS",
      "TS",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Motion",
      "Zustand",
      "RTK",
      "Axios",
      "React Query",
      "React Hook Form",
      "Zod",
      "Vercel",
      "Figma",
    ],
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/yuliia-kosenchuk/",
      },
      { type: "github", url: "https://github.com/YuliiaKosenchuk" },
      { type: "email", url: "yuliia.kosenchuk@gmail.com" },
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
      <div className="w-full grid md:grid-cols-[519px_1fr] md:gap-x-33.25 items-center mb-12 px-4 md:pr-0 md:pl-[max(2rem,calc((100vw-1344px)/2+2rem))]">
        <div>
          <h1
            className="text-[64px] leading-[1.1] tracking-tight text-black mb-8"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            A student project.
            <br />
            Built by a real team.
          </h1>
          <div
            className="flex flex-col gap-4 text-[16px] leading-[1.3] text-[#4E4E4E] max-w-120 mb-10"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            <p>
              Fashion Marketplace is a conceptual e-commerce platform created as
              a graduation project at Mate Academy.
            </p>
            <p>
              Our goal was to design and build a modern online shopping
              experience from research and UX strategy to development, testing
              and analytics
            </p>
            <p>
              This project was created by a multidisciplinary team of six
              students who collaborated as if working in a real product company.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-4">
                <Icon size={24} strokeWidth={1.25} className="text-black" />
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

        <div className="relative overflow-hidden h-72 md:h-177">
          <Image
            src="/images/about.png"
            alt="Our team at work"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={100}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7">
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
                      <span className="font-medium text-black">{member.location}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <p
                    className="text-[16px] leading-[1.3] text-medium tracking-widest text-black mb-2"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    Key achievements
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
                    Contact with me
                  </p>
                  <div className="flex gap-2">
                    {member.socials.map((social) => {
                      const config = SOCIAL_CONFIG[social.type];
                      const Icon = config.icon;
                      return (
                        <a
                          key={social.type}
                          href={social.url}
                          aria-label={config.label}
                          className="flex h-8 w-8 items-center justify-center bg-black text-white text-[11px] font-medium hover:opacity-80 transition-opacity"
                          style={{ fontFamily: "var(--font-jost)" }}
                        >
                          {Icon ? (
                            <Icon size={24} strokeWidth={1.5} />
                          ) : config.iconSrc ? (
                            <Image
                              src={config.iconSrc}
                              alt={config.label}
                              width={24}
                              height={24}
                              className="invert"
                            />
                          ) : (
                            <span className={`text-[16px] ${config.textClassName ?? ""}`}>
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
