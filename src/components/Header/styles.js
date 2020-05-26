import styled from 'styled-components/native';
import colors from '../../styles/colors';

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
