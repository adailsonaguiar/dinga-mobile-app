import React from 'react';
import {Alert, StatusBar} from 'react-native';
import colors from '../../styles/colors';
import {getArrayAccounts} from '../../utils/accounts';
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
import {getId, loadData} from '../../services/realm';
import {showAlertError} from '../../services/alertService';

export default function AccountForm({route, navigation}) {
  const accountItem = route.params?.account || null;
  const dispatch = useDispatch();

  const INITIAL_VALUES = {
    id: accountItem ? accountItem.item.id : '',
    date: accountItem ? accountItem.date : '',
    description: accountItem ? accountItem.item.description : '',
    balance: accountItem ? accountItem.item.balance / 100 : 0,
    initialBalance: accountItem ? accountItem.item.balance / 100 : 0,
    account: accountItem ? accountItem : null,
  };
  const loading = useSelector((state) => state.accounts.loading);
  const refs = {};

  const validateForm = (values) => {
    if (!values.account) {
      showAlertError('Selecione uma conta!');
      return false;
    }
    if (!values.description.length) {
      showAlertError('Digite uma descrição!');
      return false;
    }
    return true;
  };

  const askDelection = async (account) => {
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
            handleDeleteAccount(account);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleDeleteAccount = async (account) => {
    const data = await loadData(
      'transaction',
      `accountId = ${account.id} LIMIT(1)`,
    );
    if (data.length)
      showAlertError(
        'Você não pode remover essa conta, ela ainda contém transações',
      );
    else {
      dispatch(deleteAccount(account));
      navigation.goBack();
    }
  };

  async function verifyTransactionsAsociate(id) {
    const data = await loadData('transaction', `accountId = ${id} LIMIT(1)`);
    console.log(!!data.length);
    if (data.length) return true;
    return false;
  }

  async function saveAccountBd(values) {
    if (validateForm(values)) {
      if (!accountItem) {
        const idMaxAccount = await getId('contas');
        values.id = idMaxAccount;
      }
      if (typeof values.balance === 'string')
        values.balance = refs.balance.getRawValue();
      values.balance = values.balance * 100;

      const date = new Date();
      values.day = String(date.getDate());
      values.month = String(date.getMonth() + 1);
      values.year = String(date.getFullYear());

      values.account = values.account.value;

      dispatch(saveAccount(values));
      navigation.goBack();
    }
  }

  async function onSubmit(values) {
    if (!!accountItem) {
      const transactionsAssociate = await verifyTransactionsAsociate(values.id);
      if (transactionsAssociate) {
        showAlertError(
          'Você não pode editar essa conta, ela ainda contém transações',
        );
      } else saveAccountBd(values);
    } else saveAccountBd(values);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundColorPrimary}
      />
      <Header
        title={accountItem ? 'Atualizar conta' : 'Nova conta'}
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
              options={getArrayAccounts()}
              lineLeftColor
              enable={false}
              value={accountItem}
              onValueChange={(selected) => {
                setFieldValue('account', selected);
                setFieldValue('description', selected.accountType);
              }}
            />
            <Input
              label="Descrição"
              value={values.description}
              onChangeText={(text) => {
                setFieldValue('description', text);
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
            {accountItem && (
              <ContainerFormFooter>
                <BtnRemove onPress={() => askDelection(values)}>
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
