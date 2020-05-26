import styled from 'styled-components/native';
import {Animated} from 'react-native';
import colors from '../../styles/colors';

export const Container = styled(Animated.View)`
  height: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const TabsContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {paddingRight: 5},
  overScrollMode: 'never',
})``;

export const TabItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100px;
  height: 100px;
  background: ${colors.backgroundColorSecondary};
  border-radius: 3px;
  margin-left: 15px;
  padding: 10px;
  align-items: center;
`;

export const TitleCard = styled.Text`
  color: #fff;
  font-family: Roboto-Light;
  font-size: 13px;
  padding-bottom: 10px;
`;

export const IconArea = styled.View`
  flex: 3;
  padding-top: 15px
  align-items: center;
`;

export const ImageIcon = styled.Image`
  width: 35px;
  height: 35px;
`;
