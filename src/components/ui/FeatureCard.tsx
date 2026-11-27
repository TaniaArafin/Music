const icons = {
  check: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="white" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="white" aria-hidden="true">
      <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
      <path d="M16 4.6a3.5 3.5 0 010 6.8M18 14.8c1.8.7 3 2.4 3.5 5.2" />
    </svg>
  ),
  wave: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 12h2M7 8v8M11 4v16M15 7v10M19 10v4M21 12h0" />
    </svg>
  ),
} as const;

export type FeatureIcon = keyof typeof icons;

type FeatureCardProps = {
  title: string;
  content: string;
  icon?: FeatureIcon;
};

export function FeatureCard({ title, content, icon = "check" }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white px-10 py-14 text-center shadow-lg">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blossom-400 text-blossom-400 shadow-md">
        {icons[icon]}
      </div>
      <h3 className="mt-8 font-serif text-2xl font-semibold tracking-wide text-eggplant-950">{title}</h3>
      <p className="mt-4 max-w-xs leading-relaxed tracking-wide text-eggplant-600">{content}</p>
    </div>
  );
}
