import Realm from 'realm';

import TransactionSchema from '../schemas/TransactionSchema';
import ContasSchema from '../schemas/ContasSchema';

export default function getRealm() {
  return Realm.open({
    schema: [TransactionSchema, ContasSchema],
  });
}
