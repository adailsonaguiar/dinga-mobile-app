import {StyleSheet} from 'react-native';
import styled, {css} from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

const PickerWrapper = styled.View`
  border-width: 1.5px;
  border-color: #2d536c;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const SelectOption = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

const OptionIcon = styled.View`
  ${({background}) => css`
    background-color: ${background ? background : '#fff'};
    width: 15px;
    height: 15px;
  `}
`;

const LabelOption = styled.Text`
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  font-size: 16px;
  margin-left: 10px;
`;

const FieldWrapper = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Placeholder = styled.Text`
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  font-size: 16px;
`;

const Label = styled.Text`
  color: #95a5a6;
  font-family: Poppins-Medium;
  margin-bottom: 6px;
  font-size: 15px;
`;

const BtnClear = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  background-color: grey;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const stylesSheet = StyleSheet.create({
  ModalStyle: {
    backgroundColor: '#2D536C',
    borderRadius: 4,
    color: colors.fontLight,
    padding: 10,
  },
});

export {
  SelectOption,
  OptionIcon,
  LabelOption,
  stylesSheet,
  FieldWrapper,
  Placeholder,
  Label,
  PickerWrapper,
  BtnClear,
};
