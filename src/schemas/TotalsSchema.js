const TotalsSchema = {
  name: 'totals',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    totalValueAccounts: 'string',
    totalValueTransactions: 'string',
  },
};

export default TotalsSchema;
