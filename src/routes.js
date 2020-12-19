import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Dash from './pages/Dash';
import Transactions from './pages/Transactions';
import Contas from './pages/Contas';
import ContaForm from './pages/ContaForm';
import TransactionForm from './pages/TransactionForm';
import {navigationRef} from './services/navService';

export const pages = {
  dash: 'Dash',
  contas: 'Contas',
  contaForm: 'ContaForm',
  transactions: 'Transactions',
  transactionForm: 'transactionForm',
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
        <Stack.Screen name={pages.transactions} component={Transactions} />
        <Stack.Screen
          name={pages.transactionForm}
          component={TransactionForm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
