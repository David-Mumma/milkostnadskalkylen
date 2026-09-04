'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { affiliates } from '@/data/affiliates';
import { ArrowRight } from 'lucide-react';
import type { CalcResults } from '@/components/calculator';

interface StickyBarProps {
  results: CalcResults | null;
  calculatorRef: React.RefObject<HTMLDivElement>;
}

export default function StickyBar({ results, calculatorRef }: StickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!calculatorRef.current) return;
      const rect = calculatorRef.current.getBoundingClientRect();
      const pastCalculator = rect.bottom < 0;
      const nearFooter = window.innerHeight + window.scrollY > document.body.scrollHeight - 200;
      setVisible(pastCalculator && !nearFooter);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [calculatorRef]);

  if (!visible || !results) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-slate-500">Din milkostnad</p>
          <p className="text-lg font-bold text-slate-900">
            {new Intl.NumberFormat('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(results.totalPerMil)} kr/mil
          </p>
        </div>
        <a href={affiliates.compricer.url} target="_blank" rel="noopener noreferrer nofollow" className="shrink-0">
          <Button size="sm" className="gap-1.5 bg-emerald-600 px-4 hover:bg-emerald-700">
            Sänk kostnaden
            <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  );
}
