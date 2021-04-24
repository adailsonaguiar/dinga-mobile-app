const TotalsSchema = {
  name: 'totals',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    totalValueAccounts: 'string',
    totalValueTransactions: 'string',
    year: 'string',
    month: 'string',
  },
};

export default TotalsSchema;
