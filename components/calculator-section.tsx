'use client';

import { useState, useRef, useCallback } from 'react';
import Calculator, { type CalcResults, type CalcState } from '@/components/calculator';
import StickyBar from '@/components/sticky-bar';

export default function CalculatorSection() {
  const [results, setResults] = useState<CalcResults | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleResultsChange = useCallback((r: CalcResults, _s: CalcState) => {
    setResults(r);
  }, []);

  return (
    <>
      <Calculator
        calculatorRef={calculatorRef}
        onResultsChange={handleResultsChange}
      />
      <StickyBar results={results} calculatorRef={calculatorRef} />
    </>
  );
}
