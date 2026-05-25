export interface ResellerTier {
  id: string;
  quota: number;
  totalInvestment: number;
  unitPrice: number;
  label: string;
}

export const resellerTiers: ResellerTier[] = [
  { id: '10', quota: 10, totalInvestment: 500000, unitPrice: 50000, label: '10 Kuota — Rp 500.000' },
  { id: '30', quota: 30, totalInvestment: 1350000, unitPrice: 45000, label: '30 Kuota — Rp 1.350.000' },
  { id: '50', quota: 50, totalInvestment: 2000000, unitPrice: 40000, label: '50 Kuota — Rp 2.000.000' },
  { id: '100', quota: 100, totalInvestment: 3500000, unitPrice: 35000, label: '100 Kuota — Rp 3.500.000' },
];

export const resellerDefaultRetailPrice = 149000;
