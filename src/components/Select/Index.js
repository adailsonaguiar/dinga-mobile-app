import React from 'react';
import {CustomPicker} from 'react-native-custom-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as S from './styles';

const Select = ({placeholder, label, options = [], ...rest}) => {
  function renderOption(settings) {
    const {item, getLabel} = settings;
    return (
      <S.SelectOption>
        <S.OptionIcon background={item.color} />
        <S.LabelOption>{getLabel(item)}</S.LabelOption>
      </S.SelectOption>
    );
  }

  function renderField(settings) {
    const {selectedItem, defaultText, getLabel, clear} = settings;
    return (
      <S.FieldWrapper>
        {!selectedItem && <S.Placeholder>{defaultText}</S.Placeholder>}
        {selectedItem && (
          <>
            <S.Placeholder>{getLabel(selectedItem)}</S.Placeholder>
            <S.BtnClear onPress={clear}>
              <Icon name="close" color="#fff" size={13} />
            </S.BtnClear>
          </>
        )}
      </S.FieldWrapper>
    );
  }

  return (
    <>
      <S.Label>{label}</S.Label>
      <S.PickerWrapper>
        <CustomPicker
          placeholder={placeholder}
          options={options}
          modalAnimationType="slide"
          modalStyle={S.stylesSheet.ModalStyle}
          optionTemplate={renderOption}
          getLabel={(item) => item.label}
          fieldTemplate={renderField}
          {...rest}
        />
      </S.PickerWrapper>
    </>
  );
};

export default Select;
