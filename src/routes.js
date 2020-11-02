import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Dash from './pages/Dash';
import Transacoes from './pages/Transacoes';
import Contas from './pages/Contas';
import ContaForm from './pages/ContaForm';
import DespesaForm from './pages/DespesaForm';
import {navigationRef} from './services/navService';

export const pages = {
  dash: 'Dash',
  contas: 'Contas',
  contaForm: 'ContaForm',
  transacoes: 'Transacoes',
  despesaForm: 'DespesaForm',
};

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name={pages.dash} component={Dash} />
        <Stack.Screen name={pages.contas} component={Contas} />
        <Stack.Screen name={pages.contaForm} component={ContaForm} />
        <Stack.Screen name={pages.transacoes} component={Transacoes} />
        <Stack.Screen name={pages.despesaForm} component={DespesaForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
