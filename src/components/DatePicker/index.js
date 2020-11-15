import {format} from 'date-fns';
import React, {useState} from 'react';

import * as S from './styles';

const DatePicker = ({mode, date, setDate, ...rest}) => {
  const [show, setShow] = useState(false);
  const dateInner = date ? date : new Date();

  function toogleShow() {
    console.log(show);
    setShow(!show);
  }
  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <S.Container {...rest}>
      <S.Label>Data</S.Label>
      <S.PickerWrapper onPress={() => toogleShow()}>
        <S.Value>{format(date, 'dd/MM/yyyy')}</S.Value>
        {show && (
          <S.CustomDatePicker
            testID="dateTimePicker"
            value={date || dateInner}
            mode={mode}
            display="calendar"
            onChange={onChange}
          />
        )}
      </S.PickerWrapper>
    </S.Container>
  );
};

export default DatePicker;
