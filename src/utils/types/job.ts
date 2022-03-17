export declare interface BaseJob {
  title: string;
}
export declare interface G_InterpreterJob<Timestamp> extends BaseJob {
  type: 'interpreter';
  start: Timestamp;
  end: Timestamp;
}
export declare interface G_TranslatorJob<Timestamp> extends BaseJob {
  type: 'translator';
  deadLineDate: Timestamp;
}

export declare type G_Jobs<Timestamp> = {
  interpreter: G_InterpreterJob<Timestamp>;
  translator: G_TranslatorJob<Timestamp>;
};

export declare type JobTypes = keyof G_Jobs<never>;

export declare type G_Job<Timestamp> = G_Jobs<Timestamp>[JobTypes];
export {};
