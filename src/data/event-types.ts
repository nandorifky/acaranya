export const eventTypes = [
  { value: 'wedding', label: 'Pernikahan' },
  { value: 'khitanan', label: 'Khitanan' },
  { value: 'birthday', label: 'Ulang Tahun' },
  { value: 'aqiqah', label: 'Aqiqah' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'grand-opening', label: 'Grand Opening' },
  { value: 'natal', label: 'Perayaan Natal' },
  { value: 'syukuran', label: 'Syukuran & Selamatan' },
  { value: 'other', label: 'Acara Lainnya' },
] as const;

export type EventType = typeof eventTypes[number]['value'];

