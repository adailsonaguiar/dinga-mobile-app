import React from 'react';
import {getCategories, getTransactionStatus} from '../../utils/FunctionUtils';
import CardTransaction from '../CardTransaction';
import * as S from './styles';

const SlideBanners = ({cards, navigation}) => {
  const renderItem = ({item, index}) => {
    return (
      <S.CarouselItem>
        <S.TitleCard>{item.titleHead}</S.TitleCard>
        <S.List
          data={item.transactions}
          renderItem={({item}) => (
            <CardTransaction
              transactionTitle={item.description}
              categoryTransaction={getCategories(item)[item.category].label}
              value={item.value}
              date={{day: item.day, month: item.month, year: item.year}}
              status={getTransactionStatus(item.status)}
              type={item.type}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </S.CarouselItem>
    );
  };

  return (
    <S.Container>
      <S.RnAnchorCarousel data={cards} renderItem={renderItem} />
    </S.Container>
  );
};

export default SlideBanners;
