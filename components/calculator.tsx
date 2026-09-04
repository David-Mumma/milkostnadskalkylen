'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { affiliates, disclaimer } from '@/data/affiliates';
import {
  Zap,
  Fuel,
  Droplet,
  BatteryCharging,
  Car,
  TrendingDown,
  Wallet,
  Shield,
  Wrench,
  Banknote,
  ExternalLink,
  Briefcase,
  Award,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export type Drivlina = 'bensin' | 'diesel' | 'elbil' | 'laddhybrid';

export interface CalcState {
  drivlina: Drivlina;
  annualMiles: number;
  purchasePrice: number;
  depreciationRate: number;
  ownershipYears: number;
  isCompanyCar: boolean;
  benefitValue: number;
  marginalTax: number;
  fuelReimbursement: number;
  fuelConsumption: number;
  fuelPrice: number;
  vehicleTax: number;
  insurance: number;
  inspection: number;
  parking: number;
  service: number;
  repairs: number;
  tires: number;
  wash: number;
  loanAmount: number;
  loanInterest: number;
  loanYears: number;
}

export interface CalcResults {
  totalPerMil: number;
  monthlyCost: number;
  annualCost: number;
  breakdown: {
    depreciation: number;
    fuel: number;
    insuranceTax: number;
    serviceMaintenance: number;
    interest: number;
  };
}

const DEFAULTS: CalcState = {
  drivlina: 'bensin',
  annualMiles: 1500,
  purchasePrice: 250000,
  depreciationRate: 13,
  ownershipYears: 5,
  isCompanyCar: false,
  benefitValue: 3000,
  marginalTax: 32,
  fuelReimbursement: 0,
  fuelConsumption: 0.7,
  fuelPrice: 18.5,
  vehicleTax: 1200,
  insurance: 8000,
  inspection: 600,
  parking: 2400,
  service: 4000,
  repairs: 3000,
  tires: 3000,
  wash: 1500,
  loanAmount: 0,
  loanInterest: 6,
  loanYears: 5,
};

const PRESETS: { name: string; icon: typeof Car; desc: string; state: Partial<CalcState> }[] = [
  {
    name: 'Pendlaren',
    icon: Car,
    desc: 'Begagnad diesel',
    state: {
      drivlina: 'diesel',
      annualMiles: 2500,
      purchasePrice: 180000,
      depreciationRate: 12,
      ownershipYears: 5,
      fuelConsumption: 0.55,
      fuelPrice: 19.2,
      insurance: 7000,
      vehicleTax: 1000,
    },
  },
  {
    name: 'Familjebilen',
    icon: BatteryCharging,
    desc: 'Nyare hybrid',
    state: {
      drivlina: 'laddhybrid',
      annualMiles: 1500,
      purchasePrice: 320000,
      depreciationRate: 14,
      ownershipYears: 5,
      fuelConsumption: 0.65,
      fuelPrice: 18.5,
      insurance: 9000,
      vehicleTax: 800,
    },
  },
  {
    name: 'Elbilsföraren',
    icon: Zap,
    desc: 'Modern elbil',
    state: {
      drivlina: 'elbil',
      annualMiles: 2000,
      purchasePrice: 450000,
      depreciationRate: 15,
      ownershipYears: 5,
      fuelConsumption: 1.8,
      fuelPrice: 1.6,
      insurance: 8500,
      vehicleTax: 400,
    },
  },
];

const DRIVLINA_ICONS: Record<Drivlina, typeof Car> = {
  bensin: Fuel,
  diesel: Droplet,
  elbil: Zap,
  laddhybrid: BatteryCharging,
};

function fmt(n: number): string {
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(Math.round(n));
}

function fmt2(n: number): string {
  return new Intl.NumberFormat('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export function calculate(s: CalcState): CalcResults {
  const annualMiles = Math.max(s.annualMiles, 1);

  // Depreciation or benefit tax
  let depreciation: number;
  if (s.isCompanyCar) {
    depreciation = s.benefitValue * 12 * (s.marginalTax / 100);
  } else {
    depreciation = (s.purchasePrice * (s.depreciationRate / 100)) / Math.max(annualMiles, 1);
  }

  // Fuel cost per mil
  let fuelPerMil: number;
  if (s.drivlina === 'elbil') {
    fuelPerMil = s.fuelConsumption * s.fuelPrice;
  } else if (s.drivlina === 'laddhybrid') {
    // hybrid: assume ~60% electric, 40% fuel
    fuelPerMil = s.fuelConsumption * s.fuelPrice * 0.4 + 1.8 * 1.6 * 0.6;
  } else {
    fuelPerMil = s.fuelConsumption * s.fuelPrice;
  }

  // Fixed costs per year -> per mil
  const fixedAnnual = s.vehicleTax + s.insurance + s.inspection + s.parking;
  const fixedPerMil = fixedAnnual / annualMiles;

  // Variable costs per year -> per mil
  const variableAnnual = s.service + s.repairs + s.tires + s.wash;
  const variablePerMil = variableAnnual / annualMiles;

  // Loan interest per year -> per mil
  const annualInterest = s.loanAmount > 0 ? (s.loanAmount * (s.loanInterest / 100)) : 0;
  const interestPerMil = annualInterest / annualMiles;

  // Company car fuel reimbursement offset
  const reimbursementPerMil = s.isCompanyCar ? s.fuelReimbursement : 0;

  const totalPerMil =
    depreciation + fuelPerMil + fixedPerMil + variablePerMil + interestPerMil - reimbursementPerMil;

  const annualCost = totalPerMil * annualMiles;
  const monthlyCost = annualCost / 12;

  return {
    totalPerMil: Math.max(totalPerMil, 0),
    monthlyCost: Math.max(monthlyCost, 0),
    annualCost: Math.max(annualCost, 0),
    breakdown: {
      depreciation: Math.max(depreciation, 0),
      fuel: Math.max(fuelPerMil - reimbursementPerMil, 0),
      insuranceTax: Math.max(fixedPerMil, 0),
      serviceMaintenance: Math.max(variablePerMil, 0),
      interest: Math.max(interestPerMil, 0),
    },
  };
}

interface CalculatorProps {
  onResultsChange?: (results: CalcResults, state: CalcState) => void;
  calculatorRef?: React.RefObject<HTMLDivElement>;
}

export default function Calculator({ onResultsChange, calculatorRef }: CalculatorProps) {
  const [state, setState] = useState<CalcState>(DEFAULTS);
  const results = useMemo(() => calculate(state), [state]);

  useEffect(() => {
    onResultsChange?.(results, state);
  }, [results, state, onResultsChange]);

  const update = <K extends keyof CalcState>(key: K, value: CalcState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: Partial<CalcState>) => {
    setState((prev) => ({ ...prev, ...preset }));
  };

  const reset = () => setState(DEFAULTS);

  const DrivlinaIcon = DRIVLINA_ICONS[state.drivlina];

  // Breakdown for progress bars
  const breakdownItems = [
    { label: state.isCompanyCar ? 'Förmånsskatt' : 'Värdeminskning', value: results.breakdown.depreciation, color: 'bg-emerald-500' },
    { label: state.drivlina === 'elbil' ? 'El' : 'Drivmedel', value: results.breakdown.fuel, color: 'bg-indigo-500' },
    { label: 'Försäkring & Fordonsskatt', value: results.breakdown.insuranceTax, color: 'bg-sky-500' },
    { label: 'Service, Däck & Underhåll', value: results.breakdown.serviceMaintenance, color: 'bg-amber-500' },
    { label: 'Räntekostnader', value: results.breakdown.interest, color: 'bg-rose-500' },
  ].filter((item) => item.value > 0.01);

  const maxBreakdown = Math.max(...breakdownItems.map((b) => b.value), 1);

  const isElectric = state.drivlina === 'elbil';
  const fuelUnit = isElectric ? 'kWh/mil' : 'l/mil';
  const priceUnit = isElectric ? 'kr/kWh' : 'kr/l';

  return (
    <div ref={calculatorRef} className="space-y-6">
      {/* Presets */}
      <div>
        <Label className="mb-3 block text-sm font-medium text-slate-600">Snabbval</Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PRESETS.map((preset) => {
            const Icon = preset.icon;
            const active = state.drivlina === preset.state.drivlina && state.annualMiles === preset.state.annualMiles;
            return (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.state)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  active
                    ? 'border-emerald-600 bg-emerald-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${active ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{preset.name}</p>
                  <p className="text-xs text-slate-500">{preset.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Inputs */}
        <Card className="border-slate-200 shadow-sm lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg text-slate-900">Indata</CardTitle>
              <CardDescription className="text-sm">Anpassa efter din situation</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 text-slate-500">
              <RotateCcw className="h-3.5 w-3.5" />
              Återställ
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Drivlina */}
            <div>
              <Label className="mb-2 block text-sm font-medium text-slate-700">Drivlina</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(['bensin', 'diesel', 'elbil', 'laddhybrid'] as Drivlina[]).map((d) => {
                  const Icon = DRIVLINA_ICONS[d];
                  const active = state.drivlina === d;
                  return (
                    <button
                      key={d}
                      onClick={() => update('drivlina', d)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium capitalize transition-all ${
                        active
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {d === 'elbil' ? 'Elbil' : d === 'laddhybrid' ? 'Hybrid' : d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Körsträcka */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700">Körsträcka</Label>
                <Badge variant="secondary" className="font-mono">{state.annualMiles} mil/år</Badge>
              </div>
              <Slider
                value={[state.annualMiles]}
                onValueChange={(v) => update('annualMiles', v[0])}
                min={500}
                max={4000}
                step={100}
              />
            </div>

            {/* Ägandeform toggle */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-500" />
                <Label className="text-sm font-medium text-slate-700">Förmånsbil / Tjänstebil</Label>
              </div>
              <Switch checked={state.isCompanyCar} onCheckedChange={(v) => update('isCompanyCar', v)} />
            </div>

            {/* Ownership section */}
            {state.isCompanyCar ? (
              <div className="space-y-4 rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Förmånsbil</p>
                <NumberField
                  label="Förmånsvärde"
                  suffix="kr/mån"
                  value={state.benefitValue}
                  onChange={(v) => update('benefitValue', v)}
                />
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700">Marginalskatt</Label>
                    <Badge variant="secondary" className="font-mono">{state.marginalTax}%</Badge>
                  </div>
                  <Slider
                    value={[state.marginalTax]}
                    onValueChange={(v) => update('marginalTax', v[0])}
                    min={20}
                    max={55}
                    step={1}
                  />
                </div>
                <NumberField
                  label="Drivmedelsförmån / Milersättning"
                  suffix="kr/mil"
                  value={state.fuelReimbursement}
                  onChange={(v) => update('fuelReimbursement', v)}
                />
              </div>
            ) : (
              <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Privatägd bil</p>
                <NumberField
                  label="Inköpspris"
                  suffix="kr"
                  value={state.purchasePrice}
                  onChange={(v) => update('purchasePrice', v)}
                />
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700">Värdeminskning</Label>
                    <Badge variant="secondary" className="font-mono">{state.depreciationRate}%/år</Badge>
                  </div>
                  <Slider
                    value={[state.depreciationRate]}
                    onValueChange={(v) => update('depreciationRate', v[0])}
                    min={5}
                    max={25}
                    step={0.5}
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700">Ägandetid</Label>
                    <Badge variant="secondary" className="font-mono">{state.ownershipYears} år</Badge>
                  </div>
                  <Slider
                    value={[state.ownershipYears]}
                    onValueChange={(v) => update('ownershipYears', v[0])}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>
              </div>
            )}

            {/* Drivmedel */}
            <div className="space-y-4">
              <Separator />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <NumberField
                  label={isElectric ? 'Förbrukning' : 'Förbrukning'}
                  suffix={fuelUnit}
                  value={state.fuelConsumption}
                  step={isElectric ? 0.1 : 0.05}
                  onChange={(v) => update('fuelConsumption', v)}
                />
                <NumberField
                  label={isElectric ? 'Elpris (hemmaladdning)' : 'Bränslepris'}
                  suffix={priceUnit}
                  value={state.fuelPrice}
                  step={isElectric ? 0.1 : 0.5}
                  onChange={(v) => update('fuelPrice', v)}
                />
              </div>
            </div>

            {/* Fasta & rörliga kostnader */}
            <Tabs defaultValue="fixed">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fixed">Fasta kostnader</TabsTrigger>
                <TabsTrigger value="variable">Rörliga kostnader</TabsTrigger>
              </TabsList>
              <TabsContent value="fixed" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <NumberField label="Fordonsskatt" suffix="kr/år" value={state.vehicleTax} onChange={(v) => update('vehicleTax', v)} />
                  <NumberField label="Bilförsäkring" suffix="kr/år" value={state.insurance} onChange={(v) => update('insurance', v)} />
                  <NumberField label="Besiktning" suffix="kr/år" value={state.inspection} onChange={(v) => update('inspection', v)} />
                  <NumberField label="Boendeparkering" suffix="kr/år" value={state.parking} onChange={(v) => update('parking', v)} />
                </div>
              </TabsContent>
              <TabsContent value="variable" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <NumberField label="Service" suffix="kr/år" value={state.service} onChange={(v) => update('service', v)} />
                  <NumberField label="Reparationer" suffix="kr/år" value={state.repairs} onChange={(v) => update('repairs', v)} />
                  <NumberField label="Däckslitage / Däckhotell" suffix="kr/år" value={state.tires} onChange={(v) => update('tires', v)} />
                  <NumberField label="Biltvätt" suffix="kr/år" value={state.wash} onChange={(v) => update('wash', v)} />
                </div>
              </TabsContent>
            </Tabs>

            {/* Finansiering */}
            <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Finansiering (valfritt)</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <NumberField label="Lånebelopp" suffix="kr" value={state.loanAmount} onChange={(v) => update('loanAmount', v)} />
                <NumberField label="Räntesats" suffix="%" value={state.loanInterest} step={0.5} onChange={(v) => update('loanInterest', v)} />
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700">Amorteringstid</Label>
                    <Badge variant="secondary" className="font-mono">{state.loanYears} år</Badge>
                  </div>
                  <Slider
                    value={[state.loanYears]}
                    onValueChange={(v) => update('loanYears', v[0])}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4 lg:col-span-2">
          {/* Big numbers */}
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-emerald-700">
                <Car className="h-5 w-5" />
                <span className="text-sm font-medium">Total milkostnad</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-slate-900">
                {fmt2(results.totalPerMil)} <span className="text-lg font-normal text-slate-500">kr/mil</span>
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white/80 p-3">
                  <p className="text-xs text-slate-500">Per månad</p>
                  <p className="text-lg font-bold text-slate-900">{fmt(results.monthlyCost)} kr</p>
                </div>
                <div className="rounded-lg bg-white/80 p-3">
                  <p className="text-xs text-slate-500">Per år</p>
                  <p className="text-lg font-bold text-slate-900">{fmt(results.annualCost)} kr</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown bars */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-slate-900">Kostnadsfördelning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {breakdownItems.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">{item.label}</span>
                    <span className="font-mono text-slate-500">{fmt2(item.value)} kr/mil</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${(item.value / maxBreakdown) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compricer CTA */}
          <Card className="border-emerald-600 shadow-md ring-1 ring-emerald-600/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-base text-slate-900">{affiliates.compricer.name}</CardTitle>
                </div>
                <Badge className="bg-emerald-600 text-white">{affiliates.compricer.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-medium text-slate-700">
                Din beräknade försäkring: {fmt(state.insurance)} kr/år – Sänk kostnaden hos {affiliates.compricer.name}
              </p>
              <a href={affiliates.compricer.url} target="_blank" rel="noopener noreferrer nofollow">
                <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700">
                  Jämför försäkring gratis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <p className="text-xs text-slate-500">{affiliates.compricer.microText}</p>
            </CardContent>
          </Card>

          {/* Loan CTA */}
          {state.loanAmount > 0 && (
            <Card className="border-indigo-200 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-indigo-600" />
                  <CardTitle className="text-base text-slate-900">{affiliates.sambla.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium text-slate-700">
                  Betalar du onödigt hög ränta på billånet? Jämför privatlån & sänk månadskostnaden
                </p>
                <a href={affiliates.sambla.url} target="_blank" rel="noopener noreferrer nofollow">
                  <Button variant="outline" className="w-full gap-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50">
                    Jämför lån
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
                <p className="text-xs text-slate-500">{affiliates.sambla.microText}</p>
              </CardContent>
            </Card>
          )}

          <p className="text-center text-xs text-slate-400">{disclaimer}</p>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  suffix,
  value,
  onChange,
  step = 100,
}: {
  label: string;
  suffix: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  return (
    <div>
      <Label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</Label>
      <div className="relative">
        <Input
          type="number"
          value={value}
          step={step}
          min={0}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="pr-16 font-mono text-sm"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}
