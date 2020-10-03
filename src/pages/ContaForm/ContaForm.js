import React from 'react';
import {StatusBar} from 'react-native';
import colors from '../../styles/colors';
import {accounts} from '../../utils/accounts';
import {useDispatch, useSelector} from 'react-redux';
import {saveAccount} from '../../store/accounts/actions';

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

export default function ContaForm({route, navigation, idAccount = ''}) {
  const {
    params: {account},
  } = route;
  const accountItem = account && account.item;
  const dispatch = useDispatch();

  const INITIAL_VALUES = {
    id: accountItem ? accountItem.id : '',
    date: accountItem ? accountItem.date : '',
    accountType: account ? account.accountType : '',
    balance: accountItem ? accountItem.balance : 0,
    account: account ? account : undefined,
  };
  const loading = useSelector((state) => state.accounts.loading);
  const refs = {};

  // const handleLoadAccounts = () => {
  //   dispatch(loadAccounts());
  // };

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

  // const askDelection = async () => {
  //   Alert.alert(
  //     'Atenção',
  //     'Deseja realmente deletar essa conta?',
  //     [
  //       {
  //         text: 'Cancelar',
  //         onPress: () => {},
  //         style: {backgroundColor: 'red'},
  //       },
  //       {
  //         text: 'Sim',
  //         onPress: () => {
  //           deleteAccount();
  //         },
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };

  // const deleteAccount = async () => {
  //   setLoading(true);
  //   const realm = await getRealm();
  //   try {
  //     realm.write(() => {
  //       const conta = realm.objectForPrimaryKey('contas', id);
  //       realm.delete(conta);
  //       setLoading(false);
  //       handleLoadAccounts();
  //       navigation.goBack();
  //     });
  //   } catch (e) {
  //     setLoading(false);
  //     messageResponse.error(e);
  //   }
  // };

  async function onSubmit(values) {
    console.info(values);
    // if (validateForm(values)) {
    //   const account = values.account.value;
    //   let id = values.id;
    //   let balance = values.balance;
    //   if (!idAccount.length) {
    //     const idMaxAccount = await getId('contas');
    //     id = idMaxAccount;
    //   }
    //   if (typeof values.balance === 'string')
    //     balance = refs.balance.getRawValue();
    //   const date = new Date();
    //   values = {...values, account, id, date, balance};
    //   console.log(values);
    //   navigation.goBack();
    //   dispatch(saveAccount(values));
    // }
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundColorPrimary}
      />
      <Header title={idAccount.length ? 'Atualizar conta' : 'Nova conta'} />

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
            {/* {!idAccount.length && (
              <ContainerFormFooter>
                <BtnRemove onPress={() => askDelection()}>
                  <LabelBtnRemove>Deletar Conta</LabelBtnRemove>
                </BtnRemove>
              </ContainerFormFooter>
            )} */}
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
