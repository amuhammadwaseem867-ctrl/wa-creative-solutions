import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { ArrowUpLeft, Check, Clock } from "lucide-react";
import { EmberLight, StarField } from "@/components/ui/Atmosphere";
import { ProjectCard } from "@/components/work/ProjectCard";
import { projects, type Project } from "@/lib/projects";
import { absoluteUrl, contact, site } from "@/lib/site";

const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], display: "swap" });

const title = "تصميم وتطوير المواقع الإلكترونية للشركات في السعودية والإمارات";
const description =
  "استوديو WA Creative Solution يصمم ويطوّر مواقع إلكترونية ثنائية اللغة (عربي وإنجليزي) ومتاجر إلكترونية وهويات بصرية للشركات في الرياض وجدة ودبي وأبوظبي، بعروض أسعار ثابتة.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/ar",
    languages: { ar: "/ar", "en-SA": "/web-design-agency/saudi-arabia", "en-AE": "/web-design-agency/uae", "x-default": "/web-design-agency/saudi-arabia" },
  },
  openGraph: { url: "/ar", title: `${title} — ${site.name}`, description, locale: "ar_SA" },
};

const reasons = [
  { t: "تصميم عربي حقيقي من اليمين إلى اليسار", d: "واجهة معكوسة بالكامل للعربية، وخطوط عربية مناسبة، وصفحات مستقلة لكل لغة تظهر في نتائج البحث، بدلاً من أداة ترجمة آلية." },
  { t: "الطلب عبر واتساب", d: "صفحات منتجات وقوائم طعام ترسل الطلب جاهزاً إلى واتساب، كما في موقعي BR9 Cafe وCellCraft اللذين قمنا ببنائهما." },
  { t: "سرعة وظهور في محركات البحث", d: "مواقع مبنية بتقنية Next.js سريعة على الجوال، مع عناوين ووصف وبيانات منظّمة تساعد جوجل على فهم كل صفحة." },
  { t: "احترام خصوصية البيانات", d: "نماذج تجمع ما تحتاجه فقط وتوضح السبب، بما يتوافق مع نظام حماية البيانات الشخصية في المملكة وقواعد حماية البيانات في الإمارات." },
];

const services = [
  { t: "الهوية البصرية والاستراتيجية", d: "شعار ونظام ألوان وخطوط ودليل استخدام يعمل بالعربية واللاتينية." },
  { t: "تصميم وتطوير المواقع", d: "مواقع سريعة ومخصصة بتقنية Next.js، مصممة لتحويل الزوار إلى عملاء." },
  { t: "حلول الذكاء الاصطناعي", d: "مساعدات محادثة وأتمتة تخدم عملاءك على مدار الساعة." },
  { t: "ثلاثي الأبعاد والموشن", d: "عرض المنتجات بتقنيات ثلاثية الأبعاد وحركة سينمائية." },
  { t: "التسويق الرقمي والمحتوى", d: "قوالب حملات ومنشورات للتواصل الاجتماعي بهوية موحّدة." },
  { t: "التصميم الجرافيكي", d: "عروض تقديمية ومطبوعات ومواد تسويقية واضحة واحترافية." },
];

const faq = [
  { q: "هل تبنون مواقع باللغة العربية؟", a: "نعم. نبني مواقع ثنائية اللغة بالعربية والإنجليزية، مع تخطيط من اليمين إلى اليسار للعربية وخطوط عربية مناسبة وصفحات مستقلة لكل لغة حتى تظهر النسختان في نتائج البحث. تزوّدنا بالنص العربي أو تعتمده." },
  { q: "أين يقع مكتبكم؟", a: "نحن استوديو يعمل عن بُعد ومقرّه مدينة راولبندي في باكستان، ولا يوجد لدينا مكتب في السعودية أو الإمارات. باكستان تسبق الرياض بساعتين ودبي بساعة واحدة، لذلك نعمل خلال ساعات عملكم." },
  { q: "كيف تُحسب الأسعار؟", a: "أسعارنا بالدولار الأمريكي. صفحة الأسعار تعرض أسعاراً تقريبية للبداية، وبعد مكالمة قصيرة نرسل عرض سعر مكتوباً وثابتاً لنطاق مشروعك." },
  { q: "من يملك الموقع بعد التسليم؟", a: "أنت. عند الدفعة النهائية تستلم الشيفرة المصدرية وملفات التصميم وصلاحيات الإدارة، ويبقى النطاق والاستضافة بأسمك." },
];

export default function ArabicPage() {
  const work = ["br9-cafe", "cellcraft", "restaurant-os"].map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => p !== undefined);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      description,
      inLanguage: "ar",
      url: absoluteUrl("/ar"),
      areaServed: [
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "ar",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div lang="ar" dir="rtl" className={`${arabic.className} [&_h1]:font-[inherit] [&_h2]:font-[inherit] [&_h3]:font-[inherit]`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="relative isolate overflow-hidden pt-[calc(var(--header-h)+2rem)] pb-[clamp(3rem,6vw,5rem)]">
        <EmberLight x="30%" soft className="h-[95%]" />
        <StarField />
        <div className="container-site">
          <p className="text-sm font-medium text-white/55">[ المملكة العربية السعودية · الإمارات العربية المتحدة ]</p>
          <div className="mt-[clamp(4rem,11vw,8rem)] grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="text-[clamp(2.1rem,5vw,4.4rem)] leading-[1.25] font-bold text-paper lg:col-span-8">
              مواقع إلكترونية وهويات بصرية <span className="text-chrome">للشركات في السعودية والإمارات</span>
            </h1>
            <div className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-white/70">
                نصمم ونطوّر مواقع إلكترونية ثنائية اللغة ومتاجر إلكترونية وهويات بصرية للشركات في الرياض وجدة والدمام ودبي وأبوظبي، ونبني كما يشتري عملاؤكم فعلاً: من الجوال، وغالباً عبر واتساب.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link href="/contact" className="btn btn-primary">
                  ابدأ مشروعك <ArrowUpLeft size={16} aria-hidden />
                </Link>
                <Link href="/web-design-agency/saudi-arabia" hrefLang="en" className="link-underline text-sm font-medium text-white/75 hover:text-paper">
                  English
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-14 h-px bg-gradient-to-l from-white/20 via-white/10 to-transparent" aria-hidden />
        </div>
      </section>

      <section className="section-y pt-6!" aria-labelledby="why">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <div className="card p-7 sm:p-9 lg:col-span-5">
            <Clock size={22} className="text-red" aria-hidden />
            <h2 id="why" className="mt-6 text-2xl font-bold text-paper">
              نعمل خلال ساعات عملكم
            </h2>
            <p className="mt-4 leading-relaxed text-white/65">
              باكستان تسبق الرياض بساعتين ودبي بساعة واحدة. نعمل من الاثنين إلى الجمعة، أي أننا نشارككم أربعة من أيام عملكم الخمسة، فتسير المشاريع بسرعة وتصلكم الردود في اليوم نفسه.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((r) => (
              <div key={r.t} className="card p-7">
                <Check size={18} className="text-red" aria-hidden />
                <h3 className="mt-4 text-lg font-bold text-paper">{r.t}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="services">
        <div className="container-site">
          <h2 id="services" className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold text-paper">
            ست خدمات، فريق واحد
          </h2>
          <ul className="mt-10 grid border-t border-r border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.t} className="border-b border-l border-white/10 p-6">
                <span className="text-sm text-white/35">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-bold text-paper">{s.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/55">{s.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="work">
        <div className="container-site">
          <h2 id="work" className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold text-paper">
            أعمال قمنا ببنائها، وهي متاحة الآن
          </h2>
          <p className="mt-3 max-w-2xl text-white/55">مشاريع حقيقية منشورة على الإنترنت، مع رابط لكل موقع. (المواقع نفسها باللغة الإنجليزية.)</p>
          <ul className="mt-14 grid gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-3" dir="ltr">
            {work.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="faq">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <h2 id="faq" className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold text-paper lg:col-span-4">
            أسئلة شائعة
          </h2>
          <div className="space-y-3 lg:col-span-7 lg:col-start-6">
            {faq.map((f) => (
              <details key={f.q} className="card group px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-bold text-paper sm:text-lg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 text-lg transition-transform duration-300 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-[clamp(4rem,8vw,7rem)]" aria-labelledby="cta">
        <div className="container-site">
          <div className="corners relative">
            <div className="relative isolate overflow-hidden border border-white/10 bg-black px-6 py-20 text-center sm:px-14">
              <EmberLight className="h-[115%]" />
              <h2 id="cta" className="mx-auto max-w-3xl text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[1.3] font-bold text-paper">
                لديك مشروع في السعودية أو الإمارات؟
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-white/65">أخبرنا عن فكرتك، وسنعود إليك برأي صريح وخطوات واضحة وعرض سعر مكتوب.</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-x-8 gap-y-5 sm:flex-row">
                <Link href="/contact" className="btn btn-primary">
                  ابدأ مشروعك <ArrowUpLeft size={16} aria-hidden />
                </Link>
                <a href={`mailto:${contact.email}`} className="link-underline text-sm font-medium text-white/75 hover:text-paper" dir="ltr">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
