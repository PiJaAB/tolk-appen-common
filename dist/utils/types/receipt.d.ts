export declare type G_Receipt<Timestamp> = {
    title: string;
    value: bigint;
    valueAddedTax: bigint;
    annotation: string;
    created: Timestamp;
    images: string[];
};
