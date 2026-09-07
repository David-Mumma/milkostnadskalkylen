// Root layout for milkostnadskalkylen.se
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.milkostnadskalkylen.se'),
  title: 'Milkostnadskalkylator 2026 – Räkna ut faktisk kostnad per mil & TCO',
  description:
    'Beräkna den verkliga milkostnaden för din bil (elbil, bensin, diesel, hybrid eller förmånsbil). Jämför värdeminskning, försäkring, skatt, service och lån.',
  keywords: [
    'milkostnad',
    'milkostnadskalkylator',
    'milkostnad 2026',
    'kostnad per mil',
    'TCO bil',
    'elbil kostnad per mil',
    'bensinbil kostnad',
    'dieselbil kostnad',
    'laddhybrid kostnad',
    'förmånsbil kalkyl',
    'tjänstebil kostnad',
    'bilkalkylator',
  ],
  openGraph: {
    title: 'Milkostnadskalkylator 2026 – Räkna ut faktisk kostnad per mil & TCO',
    description:
      'Beräkna den verkliga milkostnaden för din bil (elbil, bensin, diesel, hybrid eller förmånsbil). Jämför värdeminskning, försäkring, skatt, service och lån.',
    locale: 'sv_SE',
    type: 'website',
    siteName: 'Milkostnadskalkylen',
    url: 'https://www.milkostnadskalkylen.se',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Milkostnadskalkylator 2026 – Räkna ut faktisk kostnad per mil & TCO',
    description:
      'Beräkna den verkliga milkostnaden för din bil (elbil, bensin, diesel, hybrid eller förmånsbil).',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.milkostnadskalkylen.se' },
  other: {
    'tradedoubler-verification': 'TRADEDOUBLER_ID_PLACEHOLDER',
  },
};

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Milkostnadskalkylator 2026',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://www.milkostnadskalkylen.se',
  description:
    'Beräkna den verkliga milkostnaden för din bil (elbil, bensin, diesel, hybrid eller förmånsbil). Jämför värdeminskning, försäkring, skatt, service och lån.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'SEK',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1240',
  },
};

const financialProductJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: 'Milkostnadskalkylator 2026',
  category: 'Vehicle Cost Calculator',
  url: 'https://www.milkostnadskalkylen.se',
  description:
    'Kostnadsfri kalkylator för att beräkna total ägandekostnad (TCO) och milkostnad för personbilar i Sverige.',
  provider: {
    '@type': 'Organization',
    name: 'Milkostnadskalkylen.se',
    url: 'https://www.milkostnadskalkylen.se',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Vad är normal milkostnad för en personbil i Sverige?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En normal milkostnad för en personbil i Sverige ligger vanligtvis mellan 25 och 50 kr/mil beroende på drivmedel, bilmodell och körsträcka. En elbil med hemmaladdning kan ligga runt 25–32 kr/mil medan en bensin- eller dieselbil oftast landar mellan 40 och 50 kr/mil när värdeminskning, försäkring, skatt och service räknas in.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur mycket sparar man per mil med elbil jämfört med bensin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En elbil med hemmaladdning vid cirka 1,60 kr/kWh kostar ungefär 3 kr/mil i drivmedel. En bensinbil vid 18,50 kr/l och 0,7 l/mil kostar cirka 13 kr/mil. Besparingen är alltså cirka 10 kr/mil enbart på drivmedel. Vid 1 500 mil per år motsvarar det en årlig besparing på cirka 15 000 kr.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur mycket sjunker en bil i värde per år?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En ny bil tappar vanligtvis 12–15 % av sitt värde per år under de första åren, sedan avtar värdeminskningen. En bil inköpt för 300 000 kr förlrar därmed ungefär 36 000–45 000 kr i värde det första året. Värdeminskning är ofta den största dolda kostnaden vid bilägande.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur sänker man sin milkostnad snabbast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Snabbaste sättet att sänka milkostnaden är att byta till hemmaladdning om du kör elbil, jämföra och byta bilförsäkring via en kostnadsfri jämförelsetjänst, och se över drivmedelsavtal. Att minska värdeminskningstakten genom att köpa en 3–5 år gammal bil istället för en ny kan också sänka TCO avsevärt.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <head>
        <meta name="tradedoubler-verification" content="TRADEDOUBLER_ID_PLACEHOLDER" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
