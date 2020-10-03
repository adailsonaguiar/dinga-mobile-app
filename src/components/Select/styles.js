import {StyleSheet} from 'react-native';
import styled, {css} from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

export const PickerWrapper = styled.View`
  border-width: 1.5px;
  border-color: ${colors.graphite};
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const SelectOption = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

export const OptionIcon = styled.View`
  ${({background}) => css`
    background-color: ${background ? background : '#fff'};
    width: 15px;
    height: 15px;
  `}
`;

export const LabelOption = styled.Text`
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  font-size: 16px;
  margin-left: 10px;
`;

export const FieldWrapper = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Placeholder = styled.Text`
  ${({lineLeft}) => css`
    color: ${colors.fontLight};
    font-family: ${fontMedium};
    font-size: 16px;
    margin-left: ${lineLeft ? '10px' : '0'};
  `}
`;

export const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LineLeft = styled.View`
  ${({lineLeftColor}) => css`
    width: 5px;
    height: 27px;
    background-color: ${lineLeftColor};
  `}
`;

export const Label = styled.Text`
  color: #95a5a6;
  font-family: Poppins-Medium;
  margin-bottom: 6px;
  font-size: 15px;
`;

export const BtnClear = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  background-color: grey;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const stylesSheet = StyleSheet.create({
  ModalStyle: {
    backgroundColor: colors.graphite,
    borderRadius: 4,
    color: colors.fontLight,
    padding: 10,
  },
});
