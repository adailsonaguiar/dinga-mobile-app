import styled from 'styled-components/native';
import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import SwitchContainer from '../../components/SwitchContainer';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background: ${colors.backgroundColorPrimary};
`;

export const Form = styled.ScrollView`
  flex: 7;
  padding-left: 20px;
  padding-right: 20px;
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

export const ButtonSave = styled(Button)`
  margin-top: 20px;
`;

export const Switch = styled(SwitchContainer)`
  margin-top: 30px;
`;

export const CustomDatePicker = styled(DatePicker)``;
