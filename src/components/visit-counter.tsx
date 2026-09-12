import { getUniqueIpCountForPage } from "@/lib/store";
import { unstable_noStore as noStore } from "next/cache";

export async function VisitCounter({ pagePath }: { pagePath: string }) {
  noStore();
  const count = await getUniqueIpCountForPage(pagePath);
  
  // if (count === 0) return null; // Comentado para que se vea siempre, incluso con 0

  return (
    <div 
      className="mt-8 flex justify-end"
      title="Lectores únicos (por IP)"
    >
      <div className="flex items-center gap-1.5 rounded bg-cream border border-line px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink-soft shadow-sm">
        <span>👁</span>
        <span>{count} {count === 1 ? 'lector' : 'lectores'}</span>
      </div>
    </div>
  );
}
