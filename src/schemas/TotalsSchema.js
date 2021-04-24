const TotalsSchema = {
  name: 'totals',
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
