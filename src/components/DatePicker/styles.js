import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  margin-bottom: 10px;
`;

export const PickerWrapper = styled.TouchableOpacity`
  border-width: 1.5px;
  border-color: ${colors.graphite};
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  justify-content: center;
`;

export const CustomDatePicker = styled(DateTimePicker)``;

export const Label = styled.Text`
  color: #95a5a6;
  font-family: Poppins-Medium;
  margin-bottom: 6px;
  font-size: 15px;
`;

export const Value = styled.Text`
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  font-size: 16px;
`;
