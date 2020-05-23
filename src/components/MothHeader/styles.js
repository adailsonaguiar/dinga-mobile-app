import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex-direction: row;
  width: 210px;
  justify-content: space-between;
  align-items: center;
`;

export const Month = styled.Text`
  color: #fff;
  font-weight: bold;
  color: #03dac5;
`;

export const CustomIcon = styled(Icon)``;

export const ButtonMonth = styled.TouchableOpacity``;
