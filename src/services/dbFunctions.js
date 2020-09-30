import messageResponse from '../utils/messageResponse';
import getRealm from './realm';

export const getId = async (schema) => {
  try {
    const realm = await getRealm();
    const maxId = realm.objects(schema).max('id') + 1;
    if (isNaN(maxId)) {
      return 0;
    }
    return maxId;
  } catch (e) {
    messageResponse.error(e);
  }
};
