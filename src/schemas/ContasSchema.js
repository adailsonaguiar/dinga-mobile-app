export default ContasSchema = {
  name: 'contas',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    date: 'date',
    description: 'string',
    balance: 'float',
    account: 'string',
  },
};
