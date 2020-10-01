import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {withFormik} from 'formik';
import getRealm, {getId} from './../../services/realm';
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

const DespesaForm = ({
  navigation,
  setFieldValue,
  handleSubmit,
  values,
  isEdition,
  isSubmitting,
}) => {
  const accountsSaved = useSelector((state) => state.accounts.accounts);
  const [arraySelect, setArraySelect] = useState([]);

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

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundColorPrimary}
      />
      <HeaderForm>
        <TxtHeaderForm>
          {isEdition ? 'ATUALIZAR DESPESA' : 'NOVA DESPESA'}
        </TxtHeaderForm>
        <BtnFechar
          onPress={async () => {
            navigation.goBack();
          }}>
          <Icon name="close" color="#fff" size={30} />
        </BtnFechar>
      </HeaderForm>
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
          onValueChange={(selected) => setFieldValue('accountId', selected.id)}
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
          onChangeText={(value) => setFieldValue('value', value)}
        />
        {isEdition && (
          <ContainerFormFooter>
            <BtnRemove onPress={() => {}}>
              <LabelBtnRemove>Deletar Conta</LabelBtnRemove>
            </BtnRemove>
          </ContainerFormFooter>
        )}
        <ButtonWrapper>
          <Button
            label="Salvar"
            background={colors.colorDanger}
            onPress={handleSubmit}
            loading={isSubmitting}
          />
        </ButtonWrapper>
      </Form>
    </Container>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    category: '',
    value: '',
    date: '',
    description: '',
    accountId: '',
  }),

  handleSubmit: (values) => {
    console.log(values);
  },
})(DespesaForm);
