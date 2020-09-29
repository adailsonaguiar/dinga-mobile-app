import styled, {css} from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import {screenHeight} from '../../styles/dimensons';
import {fontMedium} from '../../styles/fonts';

const INPUT_HEIGHT = screenHeight / 12;

const Button = styled(RectButton)`
  ${({background}) => css`
    background: ${background ? background : colors.greenApp};
    height: ${INPUT_HEIGHT}px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  `}
`;

const Label = styled.Text`
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  font-size: 18px;
`;

export {Button, Label};
