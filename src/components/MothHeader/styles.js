import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  width: 210px;
  justify-content: space-between;
  align-items: center;
`;

export const Month = styled.Text`
  font-weight: bold;
  color: ${colors.greenApp};
`;

export const CustomIcon = styled(Icon)``;

export const ButtonMonth = styled.TouchableOpacity``;
