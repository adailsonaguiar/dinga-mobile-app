import {SCHEMAS} from '.';

const TotalsSchema = {
  name: SCHEMAS.TOTALS,
  primaryKey: 'type',
  properties: {
    type: 'string',
    value: 'string',
    year: 'string',
    month: 'string',
  },
};

export default TotalsSchema;
