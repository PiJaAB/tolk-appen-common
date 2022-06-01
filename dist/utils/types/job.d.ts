export declare type JobType = 'interpreter' | 'translator';
export declare type InterpreterCategory = 'Video' | 'Phone' | 'InSitu';
export interface JobAddress {
    name?: string;
    streetAddress?: string;
    city?: string;
    country?: string;
}
export interface BaseAssignmentDetail {
    mediator: string;
    assignmentNumber: string;
    customer: string;
}
export interface G_RequisitionDetails<Timestamp> {
    isRequisitionable: boolean;
    approvedAt?: Timestamp;
    approveBy?: {
        name: string;
        email: string;
    };
    emailTo?: string[];
    allowance?: bigint;
    start?: Timestamp;
    end?: Timestamp;
    overtimeMinutes?: number;
    timeWasteMinutes?: number;
}
export interface BaseJob<Timestamp> {
    title: string;
    assignmentDetails?: BaseAssignmentDetail;
    type: JobType;
    notes?: string;
    submissionEmails?: string[];
    submittedAt?: Timestamp;
}
export interface InterpreterAssignmentDetail extends BaseAssignmentDetail {
    administrator: string;
}
export interface BaseJobInterpreter<Timestamp> extends BaseJob<Timestamp> {
    assignmentDetails?: InterpreterAssignmentDetail;
}
export interface G_InterpreterJob<Timestamp> extends BaseJobInterpreter<Timestamp> {
    type: 'interpreter';
    start: Timestamp;
    end: Timestamp;
    category: InterpreterCategory;
    phoneNumber?: string;
    videoLink?: string;
    jobAddress?: JobAddress;
    languages?: string[];
    requisitionDetails?: G_RequisitionDetails<Timestamp>;
}
export interface G_TranslatorJob<Timestamp> extends BaseJob<Timestamp> {
    type: 'translator';
    deadline: Timestamp;
}
export declare type G_Jobs<Timestamp> = {
    interpreter: G_InterpreterJob<Timestamp>;
    translator: G_TranslatorJob<Timestamp>;
};
export declare type JobTypes = keyof G_Jobs<never>;
export declare type G_Job<Timestamp> = G_Jobs<Timestamp>[JobTypes];
export {};
