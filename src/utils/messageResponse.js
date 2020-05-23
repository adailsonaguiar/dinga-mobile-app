import {Alert} from 'react-native';

const error = erro => {
  Alert.alert('Erro', `Ocorreu um erro, tente novamente. ${erro}`);
};

module.exports = {error};
