import Link from "next/link";
import {
  ArrowRightIcon,
  MessageSquareTextIcon,
  PresentationIcon,
} from "lucide-react";

const launchCards = [
  {
    href: "/chat",
    title: "Demo Chatbot",
    description:
      "Open the workshop chatbot demo with personas, embeddings, RAG, and cost-aware routing.",
    cta: "Open demo",
    icon: MessageSquareTextIcon,
    external: false,
  },
  {
    href: "http://localhost:3030",
    title: "Presentation",
    description:
      "Open the Slidev deck in a new window for the talk flow and live presentation.",
    cta: "Open slides",
    icon: PresentationIcon,
    external: true,
  },
] as const;

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#fffdfa] px-6 py-8 text-slate-900">
      <div className="absolute inset-x-0 bottom-0 h-[34vh] bg-[#ff8e7e]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:120px_120px] opacity-35" />
      <div className="pointer-events-none absolute left-[7%] top-[13%] text-[8rem] leading-none font-light tracking-[-0.08em] text-slate-200/60 sm:text-[12rem]">
        2/3
      </div>
      <div className="pointer-events-none absolute right-[10%] top-[18%] hidden h-18 w-18 rounded-2xl border border-slate-200/80 bg-white/75 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur md:flex md:items-center md:justify-center">
        <div className="relative h-7 w-7">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#F0570F]" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#F0570F]" />
        </div>
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-6xl flex-col justify-center">
        <div className="max-w-xl">
          <p className="inline-flex rounded-full border border-[#F0570F]/15 bg-[#fff4ed] px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.32em] text-[#F0570F]">
            Dada Hub Residency • April 23, 2026
          </p>
          <h1 className="mt-10 max-w-lg text-5xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-6xl">
            Select your session path
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
            Start the live demo experience or open the slide deck in a separate
            window.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {launchCards.map((card) => {
            const Icon = card.icon;

            const content = (
              <div className="group relative flex min-h-[25rem] flex-col items-center overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-8 pb-10 pt-12 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F0570F] hover:shadow-[0_28px_80px_rgba(240,87,15,0.18)]">
                <div className="absolute inset-x-0 bottom-0 h-20 bg-[#ff8e7e]" />
                <div className="absolute inset-x-10 bottom-20 h-px bg-slate-100" />
                <div className="relative z-10 flex h-full flex-col items-center text-center">
                  <div className="flex size-24 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#fff6f1_52%,#ffe9dd_100%)] ring-12 ring-[#fff7f3] shadow-[inset_0_0_0_1px_rgba(240,87,15,0.05)]">
                    <Icon className="size-10 text-[#F0570F]" />
                  </div>
                  <h2 className="mt-8 text-[2rem] font-semibold tracking-[-0.05em] text-slate-800">
                    {card.title}
                  </h2>
                  <p className="mt-4 max-w-sm text-base leading-7 text-slate-500">
                    {card.description}
                  </p>
                  <div className="mt-auto pt-10">
                    <div className="inline-flex min-w-42 items-center justify-center gap-3 rounded-xl bg-[#6f89ed] px-6 py-4 font-medium text-white shadow-[0_14px_30px_rgba(111,137,237,0.24)] transition-transform duration-200 group-hover:scale-[1.02]">
                      {card.cta}
                      <ArrowRightIcon className="size-4" />
                    </div>
                  </div>
                </div>
              </div>
            );

            if (card.external) {
              return (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={card.title} href={card.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
