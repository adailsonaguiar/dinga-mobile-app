import {Alert} from 'react-native';

export const error = (erro) => {
  Alert.alert('Erro', `Ocorreu um erro, tente novamente. ${erro}`);
};

export const alertGeral = (title, message) => {
  Alert.alert(title, message);
};
