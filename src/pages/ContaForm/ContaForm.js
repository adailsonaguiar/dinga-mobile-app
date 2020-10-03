import React from 'react';
import {Alert, StatusBar} from 'react-native';
import colors from '../../styles/colors';
import {accounts} from '../../utils/accounts';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccount, saveAccount} from '../../store/accounts/actions';

import {
  Container,
  Form,
  BtnRemove,
  LabelBtnRemove,
  ContainerFormFooter,
  ButtonSave,
} from './styles';

import Select from '../../components/Select/Index';
import Input from '../../components/Input';
import {Formik} from 'formik';
import Header from '../../components/Header';
import {getId} from '../../services/realm';
import {alertGeral} from '../../utils/messageResponse';

export default function ContaForm({route, navigation}) {
  const {
    params: {account},
  } = route;
  const accountItem = account && account.item;
  const dispatch = useDispatch();

  const INITIAL_VALUES = {
    id: accountItem ? accountItem.id : '',
    date: accountItem ? accountItem.date : '',
    accountType: account ? account.accountType : '',
    balance: accountItem ? accountItem.balance / 100 : 0,
    account: account ? account : undefined,
  };
  const loading = useSelector((state) => state.accounts.loading);
  const refs = {};

  const validateForm = (values) => {
    if (!values.accountType.length) {
      alertGeral('Atenção', 'Digite uma descrição!');
      return false;
    }
    if (!values.balance) {
      alertGeral('Atenção', 'Preencha o saldo da conta!');
      return false;
    }
    return true;
  };

  const askDelection = async (id) => {
    Alert.alert(
      'Atenção',
      'Deseja realmente deletar essa conta?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: {backgroundColor: 'red'},
        },
        {
          text: 'Sim',
          onPress: () => {
            handleDeleteAccount(id);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleDeleteAccount = (id) => {
    dispatch(deleteAccount(id));
    navigation.goBack();
  };

  async function onSubmit(values) {
    if (validateForm(values)) {
      const account = values.account.value;
      let id = values.id;
      let balance = values.balance;
      if (!account) {
        const idMaxAccount = await getId('contas');
        id = idMaxAccount;
      }
      if (typeof values.balance === 'string')
        balance = refs.balance.getRawValue() * 100;
      const date = new Date();
      values = {...values, account, id, date, balance};
      navigation.goBack();
      dispatch(saveAccount(values));
    }
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundColorPrimary}
      />
      <Header
        title={account ? 'Atualizar conta' : 'Nova conta'}
        navigation={navigation}
      />

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => onSubmit(values)}>
        {({setFieldValue, handleSubmit, values}) => (
          <Form contentContainerStyle={{paddingBottom: 10}}>
            <Select
              placeholder="Selecione uma conta"
              label="Conta"
              options={accounts}
              lineLeftColor
              value={values.account}
              onValueChange={(selected) => {
                setFieldValue('account', selected);
                setFieldValue('accountType', selected.accountType);
              }}
            />
            <Input
              label="Tipo da conta"
              value={values.accountType}
              onChangeText={(text) => {
                setFieldValue('accountType', text);
              }}
            />
            <Input
              label="Valor"
              placeholder="R$40,00"
              type={'money'}
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$',
                suffixUnit: '',
              }}
              value={values.balance}
              onChangeText={(maskedText) => {
                setFieldValue('balance', maskedText);
              }}
              ref={(ref) => (refs.balance = ref)}
            />
            {account && (
              <ContainerFormFooter>
                <BtnRemove onPress={() => askDelection(values.id)}>
                  <LabelBtnRemove>Deletar Conta</LabelBtnRemove>
                </BtnRemove>
              </ContainerFormFooter>
            )}
            <ButtonSave
              label="Salvar"
              background={colors.greenApp}
              onPress={handleSubmit}
              loading={loading}
            />
          </Form>
        )}
      </Formik>
    </Container>
  );
}
