export const eventTypes = [
  { value: 'wedding', label: 'Pernikahan' },
  { value: 'khitanan', label: 'Khitanan' },
  { value: 'birthday', label: 'Ulang Tahun' },
  { value: 'aqiqah', label: 'Aqiqah' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'other', label: 'Acara Lainnya' },
] as const;

export type EventType = typeof eventTypes[number]['value'];
