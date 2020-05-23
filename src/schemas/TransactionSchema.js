export default class TransactionSchema {
  static schema = {
    name: 'transaction',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      description: 'string',
      value: 'string',
      day: 'string',
      month: 'string',
      year: 'string',
      type: 'string',
      accountId: 'int',
      status: 'int',
      category: 'int',
    },
  };
}
