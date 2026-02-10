import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="min-h-screen">
      {/* Placeholder — components will be built in the next phase */}
      <section className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-6 max-w-3xl px-6">
          <h1 className="text-5xl font-bold tracking-tight">
            {dict.hero.title}
          </h1>
          <p className="text-xl text-slate-400">{dict.hero.subtitle}</p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
            {dict.hero.cta}
          </button>
        </div>
      </section>
    </main>
  );
}
