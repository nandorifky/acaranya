export const eventTypes = [
  { value: 'pernikahan', label: 'Pernikahan' },
  { value: 'khitanan', label: 'Khitanan' },
  { value: 'ulang-tahun', label: 'Ulang Tahun' },
  { value: 'aqiqah', label: 'Aqiqah' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'wisuda', label: 'Graduation' },
  { value: 'grand-opening', label: 'Grand Opening' },
  { value: 'natal', label: 'Perayaan Natal' },
  { value: 'syukuran', label: 'Syukuran & Selamatan' },
  { value: 'other', label: 'Acara Lainnya' },
] as const;

export type EventType = typeof eventTypes[number]['value'];

