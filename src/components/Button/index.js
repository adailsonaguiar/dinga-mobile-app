import React from 'react';
import {ActivityIndicator} from 'react-native';

import * as S from './styles';

const Button = ({label, loading, ...rest}, ref) => {
  return (
    <S.Button {...rest} disabled={loading} activeOpacity={0.9}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <S.Label>{label}</S.Label>
      )}
    </S.Button>
  );
};

export default Button;
