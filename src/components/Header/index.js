import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';
import MonthHeader from '../MothHeader/MonthHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({title, navigation, monthTo, lineColor}) => {
  return (
    // <Container>{title ? <Title>{title}</Title> : <MonthHeader />}</Container>
    <S.HeaderForm>
      <S.RowWrapper>
        <S.TxtHeaderForm>{title}</S.TxtHeaderForm>
        <S.BtnFechar
          onPress={async () => {
            navigation.goBack();
          }}>
          <Icon name="close" color="#fff" size={30} />
        </S.BtnFechar>
      </S.RowWrapper>
      <S.Line lineColor={lineColor} />
    </S.HeaderForm>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
