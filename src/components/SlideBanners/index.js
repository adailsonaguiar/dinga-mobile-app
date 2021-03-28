import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import {screenWidth} from '../../styles/dimensons';
import * as S from './styles';

const SlideBanners = () => {
  const data = ['1', '2', '3', '4'];
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <S.Container>
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={screenWidth}
        separatorWidth={10}
        inActiveScale={1}
        itemContainerStyle={{padding: 0}}
      />
    </S.Container>
  );
};

export default SlideBanners;

const styles = StyleSheet.create({
  carousel: {
    flex: 4,
    backgroundColor: 'yellow',
  },
  item: {
    // width: '100%',
    height: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
