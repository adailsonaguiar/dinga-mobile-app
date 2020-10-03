import React from 'react';
import * as S from './styles';
import MonthHeader from '../MothHeader/MonthHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({
  title,
  navigation,
  lineColor,
  showMonthHeader = false,
  children,
}) => {
  return (
    <>
      {showMonthHeader && <MonthHeader />}
      <S.HeaderForm>
        <S.RowWrapper>
          <S.TxtHeaderForm>{title}</S.TxtHeaderForm>
          {navigation && (
            <S.BtnFechar
              onPress={async () => {
                navigation.goBack();
              }}>
              <Icon name="close" color="#fff" size={30} />
            </S.BtnFechar>
          )}
        </S.RowWrapper>
        <S.Line lineColor={lineColor} />
        {children && <S.Subtitle>{children}</S.Subtitle>}
      </S.HeaderForm>
    </>
  );
};

export default Header;
