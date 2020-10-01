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
  flex: 7;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Picker = styled.Picker`
  margin-bottom: 20px;
  color: #95a5a6;
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

export const ButtonWrapper = styled.View`
  margin-top: 20px;
`;
