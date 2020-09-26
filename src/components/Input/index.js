import React, {forwardRef} from 'react';

import * as S from './styles';

const Input = ({label, ...rest}, ref) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.InputWrapper>
        <S.Input {...rest} ref={ref} />
      </S.InputWrapper>
    </S.Container>
  );
};

export default forwardRef(Input);
