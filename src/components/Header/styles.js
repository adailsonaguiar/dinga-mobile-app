import styled, {css} from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  background: ${colors.backgroundColorPrimary};
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #03dac5;
  font-size: 17px;
  font-family: Roboto-Bold;
`;

export const HeaderForm = styled.View`
  flex: 1;
  /* background: ${colors.backgroundColorPrimary}; */
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 30px;
`;

export const RowWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TxtHeaderForm = styled.Text`
  color: ${colors.fontLight};
  font-size: 26px;
  font-family: ${fontMedium};
`;

export const BtnFechar = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  align-items: flex-end;
`;

export const Line = styled.View`
  ${({lineColor}) => css`
    width: 41px;
    height: 4px;
    background-color: ${lineColor ? lineColor : colors.greenApp};
  `}
`;
