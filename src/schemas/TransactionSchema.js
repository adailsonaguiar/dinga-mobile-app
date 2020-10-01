const TransactionSchema = {
  name: 'transaction',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    description: 'string',
    value: 'float',
    date: 'date',
    type: 'string',
    accountId: 'number',
    status: 'int',
    category: 'int',
  },
};

export const transactionType = {
  TRANSACTION_IN: 'TRANSACTION_IN',
  TRANSACTION_OUT: 'TRANSACTION_OUT',
};

export default TransactionSchema;
