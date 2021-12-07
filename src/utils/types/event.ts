type BaseEvent<T, Timestamp> = {
  type: T;
  title: string;
  description: string;
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

export type G_GenericEvent<Timpestamp> = BaseEvent<'generic', Timpestamp>;
export type G_CourseEvent<Timpestamp> = PricedEvent<'course', Timpestamp>;

export type G_Event<Timestamp> =
  | G_GenericEvent<Timestamp>
  | G_CourseEvent<Timestamp>;
