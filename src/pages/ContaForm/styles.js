import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background: ${colors.backgroundColorPrimary};
`;
export const HeaderForm = styled.View`
  flex: 1;
  background: ${colors.backgroundColorPrimary};
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 30px;
`;
export const TxtHeaderForm = styled.Text`
  color: ${colors.fontLight};
  font-size: 30px;
  font-family: Roboto-Bold;
`;
export const BtnFechar = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  align-items: flex-end;
`;
export const Form = styled.View`
  justify-content: flex-start;
  flex: 7;
`;
export const InputContainer = styled.View`
  justify-content: center;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #383642;
  height: 45px;
  margin-left: 30px;
  margin-right: 30px;
`;
export const ButtonContainer = styled.View`
  justify-content: center;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #f2f2f2;
  background: #fff;
`;
export const LabelButton = styled.Text`
  color: #f39c12ff;
  font-size: 14px;
  font-weight: bold;
`;
export const Picker = styled.Picker`
  margin-bottom: 20px;
  color: #95a5a6;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#95a5a6',
})`
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #383642;
  height: 45px;
  margin-left: 30px;
  margin-right: 30px;
  color: white;
  font-size: 17px;
`;
export const BtnNovaConta = styled.TouchableOpacity`
  background: #03dac5;
  height: 61px;
  align-items: center;
  justify-content: center;
`;
export const LabelBtn = styled.Text`
  color: ${colors.fontLight};
  font-family: Roboto-Bold;
  font-size: 18px;
`;
export const ImgConta = styled.Image`
  width: 80px;
  height: 80px;
`;
export const ContainerIcon = styled.View`
  flex: 3;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
`;
export const ContainerFormFooter = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  flex: 1;
`;
export const BtnRemove = styled.TouchableOpacity`
  background: transparent;
  border-width: 1px;
  border-color: #383642;
  height: 35px;
  width: 230px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
`;
export const LabelBtnRemove = styled.Text`
  color: ${colors.fontLight};
  font-family: Roboto-Medium;
  font-size: 11px;
  color: #95a5a6;
`;

export const styles = StyleSheet.create({
  input: {color: 'white', fontSize: 17},
});
