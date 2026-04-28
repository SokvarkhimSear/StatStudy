import { ReactNode } from 'react';

type ChapterLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function ChapterLayout({ title, subtitle, children }: ChapterLayoutProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <header className="mb-10 border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">{title}</h1>
        <p className="text-xl text-slate-500">{subtitle}</p>
      </header>
      <div className="space-y-12">
        {children}
      </div>
    </div>
  );
}
