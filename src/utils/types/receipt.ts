export type G_Receipt<Timestamp> = {
  title: string;
  value: bigint;
  valueAddedTax: bigint;
  annotation: string;
  images: string[];
};
