import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import accountsArr from '../../utils/accounts';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select/Index';
import {pages} from '../../routes';
import {alertGeral} from '../../utils/messageResponse';

import colors from '../../styles/colors';
import {
  Container,
  TxtHeaderForm,
  HeaderForm,
  BtnFechar,
  Form,
  BtnRemove,
  LabelBtnRemove,
  ContainerFormFooter,
  ButtonWrapper,
} from './styles';
import {getId} from '../../services/realm';
import {saveTransactions} from '../../store/transactions/actions';

const DespesaForm = ({navigation}) => {
  const INITIAL_VALUES = {
    category: '',
    value: '',
    date: '',
    description: '',
    accountId: '',
  };
  const dispatch = useDispatch();
  const accountsSaved = useSelector((state) => state.accounts.accounts);
  const [arraySelect, setArraySelect] = useState([]);
  const [loading, setLoading] = useState(false);
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

  async function onSubmit(values) {
    setLoading(true);
    values.value = refs.value.getRawValue();
    await dispatch(saveTransactions(values));
    setLoading(false);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundColorPrimary}
      />
      <HeaderForm>
        <TxtHeaderForm>NOVA DESPESA</TxtHeaderForm>
        <BtnFechar
          onPress={async () => {
            navigation.goBack();
          }}>
          <Icon name="close" color="#fff" size={30} />
        </BtnFechar>
      </HeaderForm>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => onSubmit(values)}>
        {({setFieldValue, handleSubmit, values, isSubmitting}) => (
          <Form contentContainerStyle={{paddingBottom: 40}}>
            <Input
              label="Descrição"
              value={values.description}
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
              value={values.value}
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
            <ButtonWrapper>
              <Button
                label="Salvar"
                background={colors.colorDanger}
                onPress={handleSubmit}
                loading={loading}
              />
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default DespesaForm;
