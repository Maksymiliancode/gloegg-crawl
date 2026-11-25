export type Pair = [string, string];

export interface Duel {
  title: string;
  text: string;
  penalty: string;
  antlers?: boolean;
}

export interface StopCard {
  kind: 'stop';
  num: string;
  name: string;
  sub: string;
  address: string;
  /** "lat,lng" sprawdzone w OpenStreetMap */
  pin: string;
  mode: 'walking' | 'transit';
  time: string;
  route: Pair[];
  note?: string;
  back: {
    title: string;
    /** Duńskie rzeczy, które robią wszyscy: [co, dlaczego] */
    must: Pair[];
    /** Jedna albo kilka konkurencji. antlers: przegrany przejmuje przechodnie rogi renifera */
    duels: Duel[];
    bonus: string;
  };
}

export interface InfoCard {
  kind: 'intro' | 'home';
  num: string;
  name: string;
  sub: string;
  time: string;
  rows: Pair[];
  note?: string;
  cta?: string;
  back?: {
    title: string;
    rules: Pair[];
    phrases: [string, string, string][];
  };
}

export type Card = StopCard | InfoCard;

export interface Player {
  name: string;
  score: number;
  /** Nosi czerwone rogi renifera */
  antlers: boolean;
}
