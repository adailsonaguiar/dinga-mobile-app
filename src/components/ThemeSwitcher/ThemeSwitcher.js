import React from 'react';
import {Button} from 'react-native';

const ThemeSwitcher = ({toggleTheme}) => (
  <Button onClick={toggleTheme} title="Alterar Tema" />
);

export default ThemeSwitcher;
