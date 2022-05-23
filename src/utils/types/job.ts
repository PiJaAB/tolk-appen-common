export type JobType = 'interpreter' | 'translator';
export type InterpreterCategory = 'Video' | 'Phone' | 'InSitu';
export interface JobAddress {
  name?: string;
  streetAddress: string;
  city: string;
  country: string;
}

export interface BaseAssignmentDetail {
  mediator: string;
  assignmentNumber: string;
}
export interface BaseJob {
  title: string;
  assignmentDetails?: BaseAssignmentDetail;
  type: JobType;
  notes?: string;
}
export interface InterpreterAssignmentDetail extends BaseAssignmentDetail {
  administrator: string;
  customer: string;
}
export interface BaseJobInterpreter extends BaseJob {
  assignmentDetails?: InterpreterAssignmentDetail;
}
export interface G_InterpreterJob<Timestamp> extends BaseJobInterpreter {
  type: 'interpreter';
  start: Timestamp;
  end: Timestamp;
  category: InterpreterCategory;
  phoneNumber?: string;
  videoLink?: string;
  jobAddress?: JobAddress;
  languages: string[];
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
