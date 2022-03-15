type InterpreterJob<T, Timestamp> = {
  type: T;
  title: string;
  jobId: string;
  start: Timestamp;
  end: Timestamp;
};

type TranslatorJob<T, Timestamp> = {
  type: T;
  title: string;
  deadLineDate: Timestamp;
  jobId: string;
};

export declare type G_Jobs<Timestamp> = {
  interpreter: InterpreterJob<'interpreter', Timestamp>;
  translator: TranslatorJob<'translator', Timestamp>;
};
export declare type G_Job<Timestamp> =
  G_Jobs<Timestamp>[keyof G_Jobs<Timestamp>];
