import styled from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';
import colors from '../../styles/colors';

export const Container = styled.View`
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  color: #95a5a6;
  font-family: Poppins-Medium;
  margin-bottom: 6px;
  font-size: 15px;
`;

export const Input = styled.TextInput`
  border-width: 1.5px;
  border-color: ${colors.graphite};
  border-radius: 4px;
  color: #fff;
  padding-left: 10px;
  font-size: 16px;
  font-family: Poppins-Medium;
`;

export const InputMask = styled(TextInputMask)`
  border-width: 1.5px;
  border-color: ${colors.graphite};
  border-radius: 4px;
  color: #fff;
  padding-left: 10px;
  font-size: 16px;
  font-family: Poppins-Medium;
`;

export const InputWrapper = styled.View`
  justify-content: center;
`;
