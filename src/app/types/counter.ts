
export interface Counter {
  id: string;
  name: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppSettings {
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
  vibrationEnabled: boolean;
}
