const ContasSchema = {
  name: 'contas',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', indexed: true},
    date: 'date',
    accountType: 'string',
    balance: 'float',
  },
};

export default ContasSchema;
