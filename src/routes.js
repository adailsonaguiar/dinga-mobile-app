import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Dash from './pages/Dash/Dash';
import Transacoes from './pages/Transacoes';
import Contas from './pages/Contas/Contas';
import ContaForm from './pages/ContaForm/ContaForm';
import DespesaForm from './pages/DespesaForm';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Dash" component={Dash} />
        <Stack.Screen name="Contas" component={Contas} />
        <Stack.Screen name="ContaForm" component={ContaForm} />
        <Stack.Screen name="Transacoes" component={Transacoes} />
        <Stack.Screen name="DespesaForm" component={DespesaForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/**
 *   {
      Dash: {
        screen: Dash,
      },
      Contas: {
        screen: Contas,
      },
      ContaForm: {
        screen: ContaForm,
      },
      Transacoes: {screen: Transacoes},
      DespesaForm: {screen: DespesaForm},
    },
 */
