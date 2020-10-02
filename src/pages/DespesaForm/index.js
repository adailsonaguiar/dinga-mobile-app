import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import accountsArr from '../../utils/accounts';
import Input from '../../components/Input';
import Select from '../../components/Select/Index';
import {pages} from '../../routes';
import {alertGeral} from '../../utils/messageResponse';

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

const DespesaForm = ({navigation}) => {
  const INITIAL_VALUES = {
    category: '',
    value: '',
    date: '',
    description: '',
    accountId: '',
    type: transactionType.TRANSACTION_IN,
    status: 0,
  };
  const dispatch = useDispatch();
  const accountsSaved = useSelector((state) => state.accounts.accounts);
  const loading = useSelector((state) => state.transactions.loading);
  const [arraySelect, setArraySelect] = useState([]);
  const refs = {};

  useEffect(() => {
    if (!accountsSaved.length) {
      alertGeral('Você precisa cadastrar uma conta primeiro!');
      navigation.navigate(pages.contaForm);
    }
    const accounts = accountsSaved.map((account) => ({
      label: accountsArr()[account.account].label,
      id: account.id,
    }));
    setArraySelect(accounts);
  }, []);

  function onSubmit(values) {
    values.value = refs.value.getRawValue();
    dispatch(saveTransactions(values));
  }

  return (
    <>
      <Header title="Nova" lineColor={colors.colorDanger} showClose>
        {'Despesa / investimento'}
      </Header>
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
                onChangeText={(text) => setFieldValue('description', text)}
              />
              <Select
                placeholder="Selecione uma categoria"
                label="Categoria"
                options={[
                  {
                    color: '#2660A4',
                    label: 'Essencial',
                    value: 1,
                  },
                  {
                    color: '#FF6B35',
                    label: 'Investimentos',
                    value: 2,
                  },
                  {
                    color: '#FFBC42',
                    label: 'Educação',
                    value: 3,
                  },
                  {
                    color: '#AD343E',
                    label: 'Extra',
                    value: 4,
                  },
                ]}
                onValueChange={(obj) => setFieldValue('category', obj.value)}
              />
              <Input
                label="Data"
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
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
