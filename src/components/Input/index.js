import React, {forwardRef} from 'react';

import * as S from './styles';

const Input = ({label, type, options, ...rest}, ref) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.InputWrapper>
        {type ? (
          <S.InputMask {...rest} ref={ref} type={type} options={options} />
        ) : (
          <S.Input {...rest} ref={ref} />
        )}
      </S.InputWrapper>
    </S.Container>
  );
};

export default forwardRef(Input);
