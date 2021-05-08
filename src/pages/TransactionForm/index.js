import React, {useState, useEffect} from 'react';
import {Alert, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {getAccountIndentity} from '../../utils/accounts';
import Input from '../../components/Input';
import Select from '../../components/Select/Index';
import {pages} from '../../routes';
import {
  categoriesExpense,
  categoriesIncome,
  getArrayCategoriesIncome,
  getArrayCategoriesExpense,
} from '../../utils/categoriesTransactions';
import {accounts} from '../../utils/accounts';

import colors from '../../styles/colors';
import {Container, Form, ButtonSave, Switch, CustomDatePicker} from './styles';
import {getId} from '../../services/realm';
import {
  deleteTransaction,
  saveTransactions,
} from '../../store/transactions/actions';
import {transactionType} from '../../schemas/TransactionSchema';
import Header from '../../components/Header';
import {showAlertError} from '../../services/alertService';
import {
  BtnRemove,
  ContainerFormFooter,
  LabelBtnRemove,
} from '../AccountForm/styles';
import {formatteNumber} from '../../utils/FunctionUtils';

const TransactionForm = ({navigation, route}) => {
  const FORM_TYPE = route.params?.formType;
  const expenseEdit = route.params?.transaction
    ? route.params?.transaction
    : null;

  function getCategories() {
    if (expenseEdit.type === transactionType.TRANSACTION_IN)
      return categoriesIncome;
    return categoriesExpense;
  }

  const dateExpense = () =>
    expenseEdit
      ? new Date(
          `${expenseEdit.year}-${formatteNumber(
            expenseEdit.month,
          )}-${formatteNumber(Number(expenseEdit.day) + 1)}T00:00:00.000Z`,
        )
      : new Date();

  console.log(dateExpense());

  const INITIAL_VALUES = {
    id: expenseEdit ? expenseEdit.id : '',
    category: expenseEdit ? getCategories()[expenseEdit.category] : {},
    value: expenseEdit ? expenseEdit.value / 100 : 0,
    initialValue: expenseEdit ? expenseEdit.value / 100 : 0,
    date: dateExpense(),
    description: expenseEdit ? expenseEdit.description : '',
    accountId: expenseEdit ? expenseEdit.accountId : null,
    account: {},
    type: !FORM_TYPE
      ? transactionType.TRANSACTION_OUT
      : transactionType.TRANSACTION_IN,
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
      showAlertError('Você precisa cadastrar uma conta primeiro!');
      navigation.navigate(pages.accountForm);
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

  function validateForm(values) {
    if (!values.description.length) {
      showAlertError('Digite uma descrição');
      return false;
    }
    if (!values.category.value) {
      showAlertError('Selecione uma categoria');
      return false;
    }
    if (values.accountId === null) {
      showAlertError('Selecione uma conta');
      return false;
    }
    return true;
  }

  async function onSubmit(values) {
    if (validateForm(values)) {
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
      values.day = String(values.date.getDate());
      values.month = String(values.date.getMonth() + 1);
      values.year = String(values.date.getFullYear());

      dispatch(saveTransactions({...values, account}));
    }
  }

  function handleSceneTitle() {
    if (expenseEdit) return 'Editar';
    if (!FORM_TYPE) return 'Nova despesa';
    return 'Nova receita';
  }

  const askDelection = async (transaction) => {
    Alert.alert(
      'Atenção',
      'Deseja realmente deletar essa transação?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: {backgroundColor: 'red'},
        },
        {
          text: 'Sim',
          onPress: () => {
            handleDelete(transaction);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleDelete = (transaction) => {
    dispatch(deleteTransaction(transaction));
    navigation.goBack();
  };

  return (
    <>
      <Header
        title={handleSceneTitle()}
        lineColor={!FORM_TYPE ? colors.colorDanger : colors.greenApp}
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
                placeholder={
                  !FORM_TYPE ? 'Compras mercadinho' : 'Prestação de seriço'
                }
              />
              <Select
                placeholder="Selecione uma categoria"
                label="Categoria"
                options={
                  !FORM_TYPE
                    ? getArrayCategoriesExpense()
                    : getArrayCategoriesIncome()
                }
                value={values.category}
                onValueChange={(obj) => setFieldValue('category', obj)}
              />
              <CustomDatePicker
                mode="date"
                date={values.date}
                setDate={(value) => {
                  if (value) setFieldValue('date', new Date(value));
                }}
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
                labelEnable={!FORM_TYPE ? 'PAGO' : 'RECEBIDO'}
                labelDisable={!FORM_TYPE ? 'NÃO PAGO' : 'NÃO RECEBIDO'}
              />
              {expenseEdit && (
                <ContainerFormFooter>
                  <BtnRemove
                    onPress={() => {
                      askDelection(INITIAL_VALUES);
                    }}>
                    <LabelBtnRemove>Deletar Transação</LabelBtnRemove>
                  </BtnRemove>
                </ContainerFormFooter>
              )}
              <ButtonSave
                label="Salvar"
                background={!FORM_TYPE ? colors.colorDanger : colors.greenApp}
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

export default TransactionForm;
