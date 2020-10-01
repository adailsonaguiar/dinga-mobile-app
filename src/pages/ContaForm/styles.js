import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

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
  font-family: ${fontMedium};
`;

export const BtnFechar = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  align-items: flex-end;
`;

export const Form = styled.ScrollView`
  flex: 12;
  padding-left: 20px;
  padding-right: 20px;
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

export const ImgConta = styled.Image`
  width: 80px;
  height: 80px;
`;

export const ContainerIcon = styled.View`
  flex: 3;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const ContainerFormFooter = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
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
  font-family: ${fontMedium};
  font-size: 11px;
  color: #95a5a6;
`;
