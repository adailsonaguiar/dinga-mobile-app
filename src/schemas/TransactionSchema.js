import { SCHEMAS } from ".";

const TransactionSchema = {
  name: SCHEMAS.TRANSACTION,
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    description: 'string',
    value: 'float',
    day: 'string',
    month: 'string',
    year: 'string',
    type: 'string',
    accountId: 'int',
    status: 'int',
    category: 'int',
  },
};

export const transactionType = {
  TRANSACTION_IN: 'TRANSACTION_IN',
  TRANSACTION_OUT: 'TRANSACTION_OUT',
};

export default TransactionSchema;
