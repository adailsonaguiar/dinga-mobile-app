import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import parse from 'date-fns/parse';
import {getAccountIndentity} from '../../utils/accounts';
import Input from '../../components/Input';
import Select from '../../components/Select/Index';
import {pages} from '../../routes';
import {alertGeral} from '../../utils/messageResponse';
import {getArrayCategories} from '../../utils/categoriesTransactions';

import colors from '../../styles/colors';
import {
  Container,
  Form,
  BtnRemove,
  LabelBtnRemove,
  ContainerFormFooter,
  ButtonWrapper,
  ButtonSave,
} from './styles';
import {getId} from '../../services/realm';
import {saveTransactions} from '../../store/transactions/actions';
import {transactionType} from '../../schemas/TransactionSchema';
import Header from '../../components/Header';

const DespesaForm = ({navigation, route}) => {
  const expenseEdit = route.params?.transaction
    ? route.params?.transaction
    : null;
  console.log(expenseEdit ? expenseEdit.date : '');
  const INITIAL_VALUES = {
    id: 0,
    category: '',
    value: expenseEdit ? expenseEdit.value / 100 : '',
    date: '',
    description: expenseEdit ? expenseEdit.description : '',
    accountId: '',
    type: transactionType.TRANSACTION_IN,
    status: 0,
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
    }

    const accountIndetify = accountsSaved.map((account) => ({
      ...standardAccounts[account.account],
      id: account.id,
      label: account.description,
    }));
    setArraySelect(accountIndetify);
  }, []);

  async function onSubmit(values) {
    const value = refs.value.getRawValue() * 100;
    const date = parse(values.date, 'dd/MM/yyyy', new Date());
    if (true) {
      const idMaxAccount = await getId('transaction');
      values.id = idMaxAccount;
    }

    console.log({...values, value, date});
    dispatch(saveTransactions({...values, value, date}));
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
              />
              <Select
                placeholder="Selecione uma categoria"
                label="Categoria"
                options={getArrayCategories()}
                onValueChange={(obj) => setFieldValue('category', obj.value)}
              />
              <Input
                label="Data"
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                value={values.date}
                onChangeText={(maskedText) => setFieldValue('date', maskedText)}
              />
              <Select
                placeholder="Selecione uma conta"
                label="Contas"
                options={arraySelect}
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
