export default class ContasSchema {
  static schema = {
    name: 'contas',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      day: 'string',
      month: 'string',
      year: 'string',
      description: 'string',
      balance: 'float',
      account: 'string',
    },
  };
}
