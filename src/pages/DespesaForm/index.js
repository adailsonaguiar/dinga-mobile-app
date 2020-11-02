import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {getAccountIndentity} from '../../utils/accounts';
import Input from '../../components/Input';
import Select from '../../components/Select/Index';
import {pages} from '../../routes';
import {alertGeral} from '../../utils/messageResponse';
import {getArrayCategories} from '../../utils/categoriesTransactions';
import categories from '../../utils/categoriesTransactions';
import {accounts} from '../../utils/accounts';

import colors from '../../styles/colors';
import {
  Container,
  Form,
  BtnRemove,
  LabelBtnRemove,
  ContainerFormFooter,
  ButtonWrapper,
  ButtonSave,
  Switch,
  CustomDatePicker,
} from './styles';
import {getId} from '../../services/realm';
import {
  loadTransactions,
  saveTransactions,
} from '../../store/transactions/actions';
import {transactionType} from '../../schemas/TransactionSchema';
import Header from '../../components/Header';

const DespesaForm = ({navigation, route}) => {
  const expenseEdit = route.params?.transaction
    ? route.params?.transaction
    : null;
  const INITIAL_VALUES = {
    id: expenseEdit ? expenseEdit.id : '',
    category: expenseEdit ? categories[expenseEdit.category] : {},
    value: expenseEdit ? expenseEdit.value / 100 : '',
    date: expenseEdit ? expenseEdit.date : new Date(),
    description: expenseEdit ? expenseEdit.description : '',
    accountId: expenseEdit ? expenseEdit.accountId : '',
    account: {},
    type: transactionType.TRANSACTION_IN,
    status: expenseEdit ? expenseEdit.status : 0,
    paid: expenseEdit ? !!expenseEdit.status : false,
  };

  const dispatch = useDispatch();
  const accountsSaved = useSelector((state) => state.accounts.accounts);
  const loading = useSelector((state) => state.transactions.loading);
  const [arraySelect, setArraySelect] = useState([]);
  const refs = {};
  const standardAccounts = getAccountIndentity();

  useEffect(() => {
    if (!accountsSaved.length) {
      alertGeral('Você precisa cadastrar uma conta primeiro!');
      navigation.navigate(pages.contaForm);
    } else if (expenseEdit) {
      const accountFiltered = accountsSaved.filter((item) => {
        if (expenseEdit) if (item.id === expenseEdit.accountId) return item;
      });
      INITIAL_VALUES.account = accountFiltered
        ? accounts[accountFiltered[0].account]
        : {};
    }
    const accountIndetify = accountsSaved.map((account) => ({
      ...standardAccounts[account.account],
      id: account.id,
      label: `${account.description} | ${
        standardAccounts[account.account].label
      }`,
    }));
    setArraySelect(accountIndetify);
  }, []);

  async function onSubmit(values) {
    if (!expenseEdit) {
      const idMaxAccount = await getId('transaction');
      values.id = idMaxAccount;
    }
    if (typeof values.value === 'string')
      values.value = refs.value.getRawValue();
    values.value = values.value * 100;
    values.status = values.paid ? 1 : 0;
    values.category = values.category.value;
    const account = values.account.value;

    dispatch(saveTransactions({...values, account}));
  }

  return (
    <>
      <Header
        title="Nova Despesa"
        lineColor={colors.colorDanger}
        navigation={navigation}
      />
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.backgroundColorPrimary}
        />
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={(values) => onSubmit(values)}>
          {({setFieldValue, handleSubmit, values}) => (
            <Form contentContainerStyle={{paddingBottom: 40}}>
              <Input
                label="Descrição"
                value={values.description}
                onChangeText={(text) => setFieldValue('description', text)}
                placeholder="Compras mercadinho"
              />
              <Select
                placeholder="Selecione uma categoria"
                label="Categoria"
                options={getArrayCategories()}
                value={values.category}
                onValueChange={(obj) => setFieldValue('category', obj)}
              />
              <CustomDatePicker
                mode="date"
                date={values.date}
                setDate={(value) => setFieldValue('date', new Date(value))}
              />
              <Select
                placeholder="Selecione uma conta"
                label="Contas"
                options={arraySelect}
                value={values.account}
                onValueChange={(selected) =>
                  setFieldValue('accountId', selected.id)
                }
              />
              <Input
                label="Valor"
                type={'money'}
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  unit: 'R$',
                  suffixUnit: '',
                }}
                onChangeText={(maskedText) => {
                  setFieldValue('value', maskedText);
                }}
                value={values.value}
                ref={(ref) => (refs.value = ref)}
                placeholder="R$ 120,00"
              />
              <Switch
                toggleSwitch={() => setFieldValue('paid', !values.paid)}
                isEnabled={values.paid}
              />
              {/* {isEdition && (
              <ContainerFormFooter>
                <BtnRemove onPress={() => {}}>
                  <LabelBtnRemove>Deletar Conta</LabelBtnRemove>
                </BtnRemove>
              </ContainerFormFooter>
            )} */}
              <ButtonSave
                label="Salvar"
                background={colors.colorDanger}
                onPress={handleSubmit}
                loading={loading}
              />
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default DespesaForm;
