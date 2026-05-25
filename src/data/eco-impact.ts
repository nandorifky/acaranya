export interface EcoStat {
  label: string;
  value: string;
  unit: string;
  icon: string;
  desc: string;
}

export const ecoImpactStats: EcoStat[] = [
  {
    label: "Kertas Dihemat",
    value: "500k+",
    unit: "Lembar",
    icon: "copy",
    desc: "Menghindari pemborosan kertas fisik dari undangan konvensional.",
  },
  {
    label: "Pohon Terlindungi",
    value: "120+",
    unit: "Pohon Dewasa",
    icon: "zap",
    desc: "Setara dengan melestarikan area hijau kecil untuk masa depan.",
  },
  {
    label: "Emisi Karbon",
    value: "65%",
    unit: "Lebih Rendah",
    icon: "globe",
    desc: "Mengurangi jejak karbon dari proses logistik dan distribusi fisik.",
  },
];
