import React from 'react';
import PropTypes from 'prop-types';
import {Container, Title} from './styles';
import MonthHeader from '../MothHeader/MonthHeader';

const Header = ({title, navigation, monthTo}) => {
  return (
    <Container>{title ? <Title>{title}</Title> : <MonthHeader />}</Container>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
