import React from 'react';
import * as S from './styles';

const SlideBanners = () => {
  const data = [
    {
      titleHead: 'Últimas Transações',
      transactions: [],
    },
    '2',
  ];
  const renderItem = ({item, index}) => {
    return (
      <S.CarouselItem>
        <S.TitleCard>{item.titleHead}</S.TitleCard>
      </S.CarouselItem>
    );
  };

  return (
    <S.Container>
      <S.RnAnchorCarousel data={data} renderItem={renderItem} />
    </S.Container>
  );
};

export default SlideBanners;
