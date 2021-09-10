import {SCHEMAS} from '.';

const ContasSchema = {
  name: SCHEMAS.ACCOUNT,
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

export default ContasSchema;
