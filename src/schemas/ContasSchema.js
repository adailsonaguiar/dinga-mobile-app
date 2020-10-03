const ContasSchema = {
  name: 'contas',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    date: 'date',
    accountType: 'string',
    balance: 'float',
    account: 'string',
  },
};

export default ContasSchema;
