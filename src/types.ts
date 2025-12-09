export type Nominee = {
  id: string;         // уникальный — для одиночных: '1','2'..., для пар: 'pair-1'
  name: string;
  nickname?: string;
  photo?: string;
  hasPhoto?: boolean;
  readyPhoto?: boolean;
  nominees?: string[];
};

export type CompositeNominee = {
  id: string;           // 'pair-1', 'duo-3' и т.д.
  name: string;         // "Симакин & Марина"
  members: string[];    // ['6','marina'] — id участников или строковые метки
  photo?: string;       // опционально — общий арт пары
  readyPhoto?: boolean;
};

export interface Nomination {
  id?: string;
  title: string;
  image: string;
  type: 'public' | 'private';
  nominees?: any[]; // массив ID, строк или объектов
}

export type VoteRecord = {
  nomineeId: string;
  nominationId?: string;
  nominationType: 'public' | 'private';
  timestamp: number;
  voterName?: string;
};
