import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from '../../utils/ResponsiveDimensionsLayout';
import colors from '../../styles/colors';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const CompHead = styled.View`
  background: ${colors.backgroundColorPrimary};
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;
export const TitleGrid = styled.Text`
  color: #00d0b4;
  font-size: 14px;
  margin-left: 10px;
  font-weight: 700;
  margin-top: 20px;
  text-align: center;
`;

export const ContainerSaldo = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const Cifra = styled.Text`
  color: #fff;
  font-size: ${wp('3%')}px;
  font-family: Roboto-Bold;
  margin-bottom: 4px;
  margin-right: 5px;
`;

export const TxtSaldo = styled.Text`
  color: #fff;
  font-size: ${wp('6%')}px;
  font-family: Roboto-Bold;
`;

export const TxtDescricao = styled.Text`
  font-family: Roboto-Medium;
  font-size: ${wp('2.5%')}px;
  color: #fff;
`;

export const Progressbar = styled.ProgressBarAndroid`
  width: 80%;
  margin-bottom: 30px;
`;
