type BaseEvent<T, Timestamp> = {
  type: T;
  title: string;
  organizer: string;
  description: string;
  externalUrl?: string | null;
  imagePath?: string | null;
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

export declare type G_Events<Timestamp> = {
  generic: BaseEvent<'generic', Timestamp>;
  course: PricedEvent<'course', Timestamp>;
};
export declare type G_Event<Timestamp> =
  G_Events<Timestamp>[keyof G_Events<Timestamp>];
