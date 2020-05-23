import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from '../../utils/ResponsiveDimensionsLayout';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const CompHead = styled.View`
  background: #283B47;
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

export const TxtSaldo = styled.Text`
  color: #00d0b4;
  font-size: ${wp('8%')}px;
  font-family: Roboto-Medium;
`;

export const TxtDescricao = styled.Text`
  font-family: Roboto-Medium;
  font-size: ${wp('2.5%')}px;
  color: #fff;
`;

export const Progressbar = styled.ProgressBarAndroid`
  width: 200px;
  margin-bottom: 30px;
`;
