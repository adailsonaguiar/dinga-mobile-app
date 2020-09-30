import React, {useState, useEffect} from 'react';
import {StatusBar, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import messageResponse from './../../utils/messageResponse';
import colors from '../../styles/colors';
import getRealm from './../../services/realm';
import {useDispatch, useSelector} from 'react-redux';
import accountsArr from '../../utils/accounts';
import Input from '../../components/Input';
import {getId} from '../../services/dbFunctions';

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

import Button from '../../components/Button';
import Select from '../../components/Select/Index';

export default function DespesaForm({navigation}) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [idAccount, setIdAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEdition, setEdit] = useState(false);
  const accountsSaved = useSelector((state) => state.accounts.accounts);
  const [arraySelect, setArraySelect] = useState([]);

  useEffect(() => {
    const accounts = accountsSaved.map((account) => ({
      label: accountsArr()[account.account].label,
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
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
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
          onValueChange={(obj) => setCategory(obj.value)}
        />
        <Input
          label="Data"
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          value={date}
          onChangeText={(maskedText) => {
            setDate(maskedText);
          }}
        />
        <Select
          placeholder="Selecione uma conta"
          label="Contas"
          options={arraySelect}
          onValueChange={(selected) => {
            setIdAccount(selected);
          }}
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
          value={balance}
          onChangeText={(value) => {
            setBalance(value);
          }}
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
            onPress={() => {}}
            loading={loading}
          />
        </ButtonWrapper>
      </Form>
    </Container>
  );
}
