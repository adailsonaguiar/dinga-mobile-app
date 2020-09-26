import styled from 'styled-components/native';
import {screenHeight} from '../../styles/dimensons';

const INPUT_HEIGHT = screenHeight / 7;

const Container = styled.View`
  height: ${INPUT_HEIGHT}px;
`;

const Label = styled.Text`
  color: #95a5a6;
  font-family: Poppins-Medium;
  margin-bottom: 6px;
  font-size: 15px;
`;

const Input = styled.TextInput`
  border-width: 1.5px;
  border-color: #2d536c;
  border-radius: 4px;
  color: #fff;
  padding-left: 10px;
  font-size: 16px;
  font-family: Poppins-Medium;
`;

const InputWrapper = styled.View`
  justify-content: center;
`;

export {Container, Label, Input, InputWrapper};
