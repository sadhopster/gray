export interface Nominee {
  id: string;
  name: string;
  nickname?: string;
  photo?: string; 
  hasPhoto?: boolean;
  readyPhoto?: boolean;
}

export interface Nomination {
  title: string;
  image: string; // Добавляем это свойство
  type?: 'public' | 'private'; // Делаем опциональным для обратной совместимости
}

export interface VoteRecord {
  nomineeId: string;
  nominationId: string;
  nominationType: 'public' | 'private';
  timestamp: number;
}


