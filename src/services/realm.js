import Realm from 'realm';

import TransactionSchema from '../schemas/TransactionSchema';
import ContasSchema from '../schemas/ContasSchema';
import TotalsSchema from '../schemas/TotalsSchema';

export default function getRealm() {
  return Realm.open({
    schema: [ContasSchema, TransactionSchema, TotalsSchema],
  });
}

export const getId = async (schema) => {
  try {
    const realm = await getRealm();
    const maxId = realm.objects(schema).max('id') + 1;
    if (isNaN(maxId)) {
      return 0;
    }
    return maxId;
  } catch (error) {
    throw error;
  }
};

export const loadData = async (schema, filter = '') => {
  return getRealm()
    .then((date) => {
      const data = date.objects(schema);
      if (!!filter) {
        const thanData = data.filtered(filter);
        return thanData;
      }
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export const writeData = async (schema, data) => {
  return getRealm().then((realm) => {
    try {
      realm.write(() => {
        realm.create(schema, data, true);
      });
    } catch (error) {
      throw error;
    }
  });
};

export const removeById = async (schema, id) => {
  getRealm()
    .then((realm) => {
      realm.write(() => {
        const data = realm.objectForPrimaryKey(schema, id);
        realm.delete(data);
      });
    })
    .catch((error) => {
      throw error;
    });
};
