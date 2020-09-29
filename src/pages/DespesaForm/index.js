import React, {useState, useEffect} from 'react';
import {StatusBar, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import messageResponse from './../../utils/messageResponse';
import colors from '../../styles/colors';
import getRealm from './../../services/realm';
import {useDispatch, useSelector} from 'react-redux';
import accountsArr from '../../utils/accounts';
import Input from '../../components/Input';

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

import standard_icon from './../../assets/contas/standard_icon.png';
import Button from '../../components/Button';
import Select from '../../components/Select/Index';

export default function DespesaForm({navigation}) {
  const {state} = navigation;
  const [contas] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [idAccount, setIdAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [isEdition, setEdit] = useState(false);
  const dispatch = useDispatch();
  const accountsSaved = useSelector((state) => state.accounts.accounts);
  const [arraySelect, setArraySelect] = useState([]);

  // console.log(accounts);

  useEffect(() => {
    const accounts = accountsSaved.map((account) => ({
      label: accountsArr()[account.account].label,
    }));
    setArraySelect(accounts);
  }, []);

  // useEffect(() => {
  //   Object.keys(accounts).map((value) =>
  //     console.log(arrayAccounts[accounts[value].account].label),
  //   );
  //   getDate().then((date) => {
  //     setday(date.day);
  //     setMonth(date.month);
  //     setYear(date.year);
  //   });
  //   const detectionAccountParams = () => {
  //     if (state.params.account) {
  //       setEdit(true);
  //       return true;
  //     }
  //     return false;
  //   };
  //   const getAccountEdit = () => {
  //     setAccount(state.params.account.account);
  //     setId(state.params.account.id);
  //     setDescription(state.params.account.description);
  //     setBalance(state.params.account.balance / 100);
  //   };
  //   if (detectionAccountParams()) {
  //     setTimeout(() => {
  //       getAccountEdit();
  //     }, 500);
  //   }
  // }, []);

  const setIconAccount = (code) => {
    setIcon(contas[code].icon);
  };

  const setPropertyAccount = (code) => {
    setAccount(code);
    setDescription(contas[code].description);
    setIconAccount(code);
  };

  const getId = async (schema) => {
    try {
      const realm = await getRealm();
      const maxId = realm.objects(schema).max('id') + 1;
      if (isNaN(maxId)) {
        return 0;
      }
      return maxId;
    } catch (e) {
      messageResponse.error(e);
    }
  };

  const formatBalance = (balance) => {
    if (typeof balance === 'string') {
      const removedChar = balance.substr(2).replace('.', '').replace(',', '.');
      const patternParse = parseFloat(removedChar) * 100;
      return patternParse;
    }
    return balance * 100;
  };

  const resetForm = () => {
    setId(-1);
    setDescription('');
    setBalance('');
    setAccount('');
    setIcon('');
  };

  const handleLoadAccounts = () => {
    dispatch(loadAccounts(month, year));
  };

  const saveAccount = async (account) => {
    setLoading(true);
    const realm = await getRealm();
    try {
      realm.write(() => {
        realm.create('contas', account, true);
        setLoading(false);
        resetForm();
        handleLoadAccounts();
        navigation.goBack();
      });
    } catch (e) {
      setLoading(false);
      messageResponse.error(e);
      return e;
    }
  };

  const validateForm = () => {
    if (description.length == 0) {
      Alert.alert('Atenção', 'Digite uma descrição!');
      return false;
    }
    if (balance.length == 0) {
      Alert.alert('Atenção', 'Preencha o saldo da conta!');
      return false;
    }
    return true;
  };
  const setObject = async () => {
    const idMaxAccount = await getId('contas');
    let idAccount = 0;
    let valueBalance = 0;
    valueBalance = formatBalance(balance);
    if (isEdition) {
      idAccount = id;
    } else {
      idAccount = idMaxAccount;
    }
    if (validateForm()) {
      const data = {
        id: idAccount,
        day,
        month,
        year,
        description,
        balance: valueBalance,
        account,
      };
      saveAccount(data);
    }
  };

  const askDelection = async () => {
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
            deleteAccount();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const deleteAccount = async () => {
    setLoading(true);
    const realm = await getRealm();
    try {
      realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('contas', id));
        setLoading(false);
        handleLoadAccounts();
        navigation.goBack();
      });
    } catch (e) {
      setLoading(false);
      messageResponse.error(e);
    }
  };

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
          onChangeText={(description) => {
            setDescription(description);
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
        {/* <InputContainer>
          <Picker
            selectedValue={idAccount}
            onValueChange={(selected) => {
              setIdAccount(selected);
            }}
            style={styles.input}>
            {Object.keys(accounts).map((value) => (
              <Picker.Item
                key={category}
                label={arrayAccounts[accounts[value].account].label}
                value={value}
              />
            ))}
          </Picker>
        </InputContainer> */}

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
          onChangeText={(balance) => {
            setBalance(balance);
          }}
        />
        {isEdition && (
          <ContainerFormFooter>
            <BtnRemove onPress={() => askDelection()}>
              <LabelBtnRemove>Deletar Conta</LabelBtnRemove>
            </BtnRemove>
          </ContainerFormFooter>
        )}
        <ButtonWrapper>
          <Button
            label="Salvar"
            background={colors.colorDanger}
            onPress={() => setObject()}
            loading={loading}
          />
        </ButtonWrapper>
      </Form>
    </Container>
  );
}
