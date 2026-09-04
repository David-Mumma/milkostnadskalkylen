import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import CalculatorSection from '@/components/calculator-section';
import {
  Zap,
  Fuel,
  Droplet,
  BatteryCharging,
  TrendingDown,
  Calculator,
  ArrowRight,
  Shield,
  Banknote,
  Briefcase,
  ExternalLink,
  Award,
  Route,
  Sparkles,
} from 'lucide-react';

const comparisonData = [
  {
    icon: Fuel,
    label: 'Bensin',
    tco1500: '~45,00 kr/mil',
    tco2500: '~40,50 kr/mil',
    annual1500: '~67 500 kr',
    annual2500: '~101 250 kr',
  },
  {
    icon: Droplet,
    label: 'Diesel',
    tco1500: '~45,50 kr/mil',
    tco2500: '~41,00 kr/mil',
    annual1500: '~68 250 kr',
    annual2500: '~102 500 kr',
  },
  {
    icon: Zap,
    label: 'Elbil',
    tco1500: '~31,00 kr/mil',
    tco2500: '~29,50 kr/mil',
    annual1500: '~46 500 kr',
    annual2500: '~73 750 kr',
    highlight: true,
  },
];

const faqs = [
  {
    question: 'Vad är normal milkostnad för en personbil i Sverige?',
    answer:
      'En normal milkostnad för en personbil i Sverige ligger vanligtvis mellan 25 och 50 kr/mil beroende på drivmedel, bilmodell och körsträcka. En elbil med hemmaladdning kan ligga runt 25–32 kr/mil medan en bensin- eller dieselbil oftast landar mellan 40 och 50 kr/mil när värdeminskning, försäkring, skatt och service räknas in.',
  },
  {
    question: 'Hur mycket sparar man per mil med elbil jämfört med bensin?',
    answer:
      'En elbil med hemmaladdning vid cirka 1,60 kr/kWh kostar ungefär 3 kr/mil i drivmedel. En bensinbil vid 18,50 kr/l och 0,7 l/mil kostar cirka 13 kr/mil. Besparingen är alltså cirka 10 kr/mil enbart på drivmedel. Vid 1 500 mil per år motsvarar det en årlig besparing på cirka 15 000 kr.',
  },
  {
    question: 'Hur mycket sjunker en bil i värde per år?',
    answer:
      'En ny bil tappar vanligtvis 12–15 % av sitt värde per år under de första åren, sedan avtar värdeminskningen. En bil inköpt för 300 000 kr förlorar därmed ungefär 36 000–45 000 kr i värde det första året. Värdeminskning är ofta den största dolda kostnaden vid bilägande.',
  },
  {
    question: 'Hur sänker man sin milkostnad snabbast?',
    answer:
      'Snabbaste sättet att sänka milkostnaden är att byta till hemmaladdning om du kör elbil, jämföra och byta bilförsäkring via en kostnadsfri jämförelsetjänst, och se över drivmedelsavtal. Att minska värdeminskningstakten genom att köpa en 3–5 år gammal bil istället för en ny kan också sänka TCO avsevärt.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(152 76% 36%) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-5 pt-14 pb-10 text-center sm:px-6 sm:pt-20 sm:pb-14">
          <Badge
            variant="outline"
            className="mb-5 inline-flex items-center gap-2 border-emerald-300 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Kalkylator lanseras snart
          </Badge>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Vad kostar det att köra bil per mil{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              2026
            </span>
            ?
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-slate-600 sm:text-xl">
            Jämför faktisk milkostnad och total ägandekostnad (TCO) mellan elbil,
            bensin, diesel och laddhybrid.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#kalkylator">
              <span className="inline-flex h-11 items-center gap-2 rounded-md bg-emerald-600 px-8 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
                <Calculator className="h-4 w-4" />
                Räkna nu
              </span>
            </a>
            <a href="#jamforelse">
              <span className="inline-flex h-11 items-center gap-2 rounded-md border border-slate-300 bg-white px-8 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                Se jämförelse
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Calculator Section */}
      <section id="kalkylator" className="mx-auto max-w-5xl scroll-mt-8 px-5 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 text-center">
          <Badge variant="secondary" className="mb-3 bg-emerald-50 text-emerald-700">
            Milkostnadskalkylator 2026
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Räkna ut din faktiska milkostnad
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Välj drivmedel, justera kostnader och se direkt vad bilen kostar dig
            per mil, månad och år.
          </p>
        </div>
        <CalculatorSection />
      </section>

      {/* Comparison Table */}
      <section id="jamforelse" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="mb-8 text-center">
            <Badge variant="secondary" className="mb-3">TCO-jämförelse</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Bensin vs Diesel vs Elbil
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Total milkostnad vid 1 500 respektive 2 500 mil per år.
            </p>
          </div>

          <Card className="overflow-hidden border-slate-200 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-900">Drivmedel</TableHead>
                  <TableHead className="text-right font-semibold text-slate-900">TCO @ 1 500 mil/år</TableHead>
                  <TableHead className="text-right font-semibold text-slate-900">TCO @ 2 500 mil/år</TableHead>
                  <TableHead className="text-right font-semibold text-slate-900">Årskostnad (1 500 mil)</TableHead>
                  <TableHead className="text-right font-semibold text-slate-900">Årskostnad (2 500 mil)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row) => {
                  const Icon = row.icon;
                  return (
                    <TableRow
                      key={row.label}
                      className={row.highlight ? 'bg-emerald-50/50' : ''}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${row.highlight ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          {row.label}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        <span className={row.highlight ? 'font-bold text-emerald-700' : ''}>{row.tco1500}</span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        <span className={row.highlight ? 'font-bold text-emerald-700' : ''}>{row.tco2500}</span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-slate-600">{row.annual1500}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-slate-600">{row.annual2500}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
          <p className="mt-4 text-center text-xs text-slate-400">
            Uppskattade genomsnittsvärden för 2026. Faktisk kostnad varierar med förarmönster, bilmodell och regionalt bränslepris.
          </p>
        </div>
      </section>

      {/* Deep Guide: Depreciation */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="mb-6 flex items-center gap-2">
            <TrendingDown className="h-6 w-6 text-emerald-600" />
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">Fördjupande guide</Badge>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Så beräknas bilens värdeminskning – och varför den är din största dolda kostnad
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              När de flesta tänker på bilkostnader fokuserar de på bränsle och
              försäkring. Men den enskilt största kostnaden vid bilägande är
              värdeminskningen – den tysta kostnaden som drabbar dig varje år
              utan att du märker det förrän det är dags att sälja.
            </p>
            <p>
              En ny bil tappar typiskt 12–15 % av sitt värde varje år under de
              första åren. En bil som kostar 300 000 kr förlorar alltså ungefär
              36 000–45 000 kr i värde det första året. Efter 5 år har bilen
              ofta tappat över hälften av sitt ursprungsvärde.
            </p>
            <p>
              <strong className="text-slate-900">Tips för att minska värdeminskningstakten:</strong>{' '}
              Köp en 3–5 år gammal bil istället för en ny. Den största
              värdenedgången sker de första åren, så en begagnad bil har redan
              tagit den största smällen. Välj populära modeller med bra
              andrahandsvärde och låg milförbrukning.
            </p>
          </div>
        </div>
      </section>

      {/* Company Car Guide */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-indigo-600" />
            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">Tjänstebilsguide</Badge>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Förmånsbil kontra privatköp – hur skatteavdrag och förmånsvärde påverkar plånboken
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              En förmånsbil kan förefallas billigare eftersom arbetsgivaren
              betalar för bilen, men förmånsvärdet beskattas som en del av din
              lön. Förmånsvärdet baseras på bilens listpris och utgör ungefär
              1 % av ett halvt listpris per månad (för bilar under 7,5 prisbasbelopp).
            </p>
            <p>
              Med en marginalskatt på 32 % kostar ett förmånsvärde på 3 000 kr/mån
              dig cirka 960 kr/mån i skatt, eller 11 520 kr/år. Till detta kommer
              drivmedelsförmån eller milersättning. För många pendlare kan en
              förmånsbil ändå löna sig om körsträckan är hög och arbetsgivaren
              erbjuder fördelaktig drivmedelsersättning.
            </p>
            <p>
              <strong className="text-slate-900">När lönar sig privatköp?</strong>{' '}
              Om du kör färre än 1 500 mil/år, har låg marginalskatt, eller vill
              ha full frihet att välja bil och försäkring. Vår kalkylator ovan
              visar båda alternativen – slå på reglaget för förmånsbil för att
              jämföra direkt.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-link: Pendlarklustret */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm">
            <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Route className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">
                  Pendlar du med bil till jobbet?
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Räkna ut ditt skatteavdrag för resor över 11 000 kr på
                  Reseavdragskalkylen.se – en del av samma oberoende kalkylnätverk.
                </p>
              </div>
              <a
                href="https://www.reseavdragskalkylen.se"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md bg-emerald-600 px-5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Till kalkylen
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="mb-8 text-center">
            <Badge variant="secondary" className="mb-3">Vanliga frågor</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frågor & svar om milkostnad
            </h2>
          </div>
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-2 sm:p-4">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="px-3 text-left text-base font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-3 text-sm leading-relaxed text-slate-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Award className="h-4 w-4 text-emerald-600" />
              <span>
                Innehåller annonslänkar från Adtraction och Addrevenue.
                Milkostnadskalkylen.se är en del av det oberoende kalkylnätverket.
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sidan innehåller samarbetslänkar. Kalkylatorn är helt oberoende och kostnadsfri.
            </p>
            <p className="text-xs text-slate-400">
              © 2026 Milkostnadskalkylen.se – Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
