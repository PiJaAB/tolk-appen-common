export interface BaseAssignmentDetail {
  mediator: string;
  assignmentNumber: string;
}
export interface BaseJob {
  title: string;
  asssignmentDetail: readonly BaseAssignmentDetail[];
}

export interface InterpreterAssignmentDetail extends BaseAssignmentDetail {
  creator: string;
  customer: string;
}
export interface BaseJobInterpreter extends BaseJob {
  asssignmentDetail: readonly InterpreterAssignmentDetail[];
}
export interface G_InterpreterJob<Timestamp> extends BaseJobInterpreter {
  type: 'interpreter';
  start: Timestamp;
  end: Timestamp;
}
export interface G_TranslatorJob<Timestamp> extends BaseJob {
  type: 'translator';
  deadline: Timestamp;
}

export type G_Jobs<Timestamp> = {
  interpreter: G_InterpreterJob<Timestamp>;
  translator: G_TranslatorJob<Timestamp>;
};

export type JobTypes = keyof G_Jobs<never>;

export type G_Job<Timestamp> = G_Jobs<Timestamp>[JobTypes];
export {};
