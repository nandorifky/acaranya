export interface ResellerTier {
  id: string;
  quota: number;
  totalInvestment: number;
  unitPrice: number;
  label: string;
}

export const resellerTiers: ResellerTier[] = [
  { id: '5', quota: 5, totalInvestment: 300000, unitPrice: 60000, label: '5 Kuota — Rp 300.000' },
  { id: '15', quota: 15, totalInvestment: 750000, unitPrice: 50000, label: '15 Kuota — Rp 750.000' },
  { id: '40', quota: 40, totalInvestment: 1800000, unitPrice: 45000, label: '40 Kuota — Rp 1.800.000' },
  { id: '100', quota: 100, totalInvestment: 4000000, unitPrice: 40000, label: '100 Kuota — Rp 4.000.000' },
];

export const resellerDefaultRetailPrice = 105000; // Updated to match Mengundang retail price
