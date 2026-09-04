export interface Affiliate {
  id: string;
  name: string;
  url: string;
  tagline: string;
  microText: string;
  badge?: string;
}

export const affiliates: Record<string, Affiliate> = {
  compricer: {
    id: 'compricer',
    name: 'Compricer',
    url: 'https://clk.tradedoubler.com/click?p=396315',
    tagline: 'Sänk din bilförsäkring',
    microText: '✓ Kostnadsfritt & ej bindande • Jämför 30+ bolag • BankID',
    badge: 'MEST VALD AV BILÄGARE',
  },
  sambla: {
    id: 'sambla',
    name: 'Sambla',
    url: 'https://www.sambla.se',
    tagline: 'Jämför privatlån & sänk månadskostnaden',
    microText: '✓ En ansökan – flera banker • Ej bindande • Besked direkt',
  },
};

export const disclaimer =
  'Sidan innehåller samarbetslänkar. Kalkylatorn är helt oberoende och kostnadsfri.';
