export default TransactionSchema = {
  name: 'transaction',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    description: 'string',
    value: 'string',
    date: 'date',
    type: 'string',
    accountId: 'int',
    status: 'int',
    category: 'int',
  },
};
