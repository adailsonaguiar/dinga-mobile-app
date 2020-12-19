import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Dash from './pages/Dash';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import AccountForm from './pages/AccountForm';
import TransactionForm from './pages/TransactionForm';
import {navigationRef} from './services/navService';

export const pages = {
  dash: 'Dash',
  accounts: 'Accounts',
  accountForm: 'AccountForm',
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
        <Stack.Screen name={pages.accounts} component={Accounts} />
        <Stack.Screen name={pages.accountForm} component={AccountForm} />
        <Stack.Screen name={pages.transactions} component={Transactions} />
        <Stack.Screen
          name={pages.transactionForm}
          component={TransactionForm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
