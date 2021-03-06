type BaseEvent<T, Timestamp> = {
  type: T;
  title: string;
  organizer: string;
  description: string;
  externalUrl?: string | null;
  imagePath?: string | null;
  tags?: Array<string>;
} & (
  | {
      published: true;
      start: Timestamp;
      end: Timestamp;
    }
  | {
      published: false;
      start: Timestamp | null;
      end: Timestamp | null;
    }
);

type PricedEvent<T, Timestamp> = BaseEvent<T, Timestamp> & {
  /**
   * Integer value
   */
  cost: number;
  unit: 'ÖRE' | 'US_CENT' | 'EUR_CENT';
};

export type G_Events<Timestamp> = {
  generic: BaseEvent<'generic', Timestamp>;
  course: PricedEvent<'course', Timestamp>;
};
export type G_Event<Timestamp> = G_Events<Timestamp>[keyof G_Events<Timestamp>];
