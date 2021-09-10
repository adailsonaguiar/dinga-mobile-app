import { SCHEMAS } from ".";

const TotalsSchema = {
  name: SCHEMAS.TOTALS,
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    value: 'string',
    type: 'string',
    year: 'string',
    month: 'string',
  },
};

export default TotalsSchema;
