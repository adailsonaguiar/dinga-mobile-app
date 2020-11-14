import styled, {css} from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

export const Container = styled.TouchableOpacity`
  border-width: 1.5px;
  border-color: ${colors.graphite};
  border-radius: 4px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CustomSwitch = styled.Switch`
  border-width: 1.5px;
  border-radius: 4px;
  padding-left: 10px;
`;

export const TitleLabel = styled.Text`
  ${({isEnabled}) => css`
    font-family: ${fontMedium};
    color: ${isEnabled ? colors.greenApp : colors.colorDanger};
  `}
`;
