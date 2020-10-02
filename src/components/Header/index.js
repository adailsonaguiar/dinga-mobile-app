import React from 'react';
import * as S from './styles';
import MonthHeader from '../MothHeader/MonthHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({
  title,
  navigation,
  lineColor,
  showClose = false,
  showMonthHeader = false,
}) => {
  return (
    <>
      {showMonthHeader && <MonthHeader />}
      <S.HeaderForm>
        <S.RowWrapper>
          <S.TxtHeaderForm>{title}</S.TxtHeaderForm>
          {showClose && (
            <S.BtnFechar
              onPress={async () => {
                navigation.goBack();
              }}>
              <Icon name="close" color="#fff" size={30} />
            </S.BtnFechar>
          )}
        </S.RowWrapper>
        <S.Line lineColor={lineColor} />
      </S.HeaderForm>
    </>
  );
};

export default Header;
