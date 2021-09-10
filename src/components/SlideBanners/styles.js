import styled from 'styled-components';
import Carousel from 'react-native-anchor-carousel';
import {screenWidth} from '../../styles/dimensons';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  flex: 3;
`;

export const RnAnchorCarousel = styled(Carousel).attrs({
  separatorWidth: 10,
  inActiveScale: 1,
  itemContainerStyle: {padding: 15},
  itemWidth: screenWidth,
})`
  flex: 4;
`;

export const CarouselItem = styled.View`
  height: 100%;
  background-color: ${colors.backgroundColorSecondary};
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 5px;
  padding-top: 15px;
`;

export const TitleCard = styled.Text`
  color: ${colors.fontLight};
  font-size: 18px;
  font-family: ${fontMedium};
  padding: 0 15px;
`;

export const List = styled.FlatList`
  width: 100%;
`;
