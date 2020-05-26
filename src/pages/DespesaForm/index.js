import React, {useState, useEffect} from 'react';
import {StatusBar, ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import messageResponse from './../../utils/messageResponse';
import colors from '../../styles/colors';
import getRealm from './../../services/realm';
import {useDispatch, useSelector} from 'react-redux';
import {getDate} from '../../utils/FunctionUtils';
import accountsArr from '../../utils/accounts';
import categories from '../../utils/categoriesTransactions';

import {
  Container,
  TxtHeaderForm,
  HeaderForm,
  BtnFechar,
  Form,
  InputContainer,
  Input,
  BtnNovaConta,
  LabelBtn,
  styles,
  Picker,
  ImgConta,
  ContainerIcon,
  BtnRemove,
  LabelBtnRemove,
  ContainerFormFooter,
  InputMask,
} from './styles';

import standard_icon from './../../assets/contas/standard_icon.png';

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
  const [day, setday] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const dispatch = useDispatch();
  const [arrayAccounts] = useState(accountsArr);
  const accounts = useSelector(state => state.accounts.accounts);

  useEffect(() => {
    Object.keys(accounts).map(value =>
      console.log(arrayAccounts[accounts[value].account].label),
    );
    getDate().then(date => {
      setday(date.day);
      setMonth(date.month);
      setYear(date.year);
    });
    const detectionAccountParams = () => {
      if (state.params.account) {
        setEdit(true);
        return true;
      }
      return false;
    };
    const getAccountEdit = () => {
      setAccount(state.params.account.account);
      setId(state.params.account.id);
      setDescription(state.params.account.description);
      setBalance(state.params.account.balance / 100);
    };
    if (detectionAccountParams()) {
      setTimeout(() => {
        getAccountEdit();
      }, 500);
    }
  }, []);

  const setIconAccount = code => {
    setIcon(contas[code].icon);
  };

  const setPropertyAccount = code => {
    setAccount(code);
    setDescription(contas[code].description);
    setIconAccount(code);
  };

  const getId = async schema => {
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

  const formatBalance = balance => {
    if (typeof balance == 'string') {
      const removedChar = balance
        .substr(2)
        .replace('.', '')
        .replace(',', '.');
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

  const saveAccount = async account => {
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
      <StatusBar barStyle="light-content" backgroundColor={colors.backgroundColorPrimary} />
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
      <Form>
        <Input
          placeholder="Descrição"
          value={description}
          onChangeText={description => {
            setDescription(description);
          }}
        />
        <InputContainer>
          <Picker
            selectedValue={category}
            onValueChange={selected => {
              setCategory(selected);
            }}
            style={styles.input}>
            {categories.map(category => (
              <Picker.Item
                key={category}
                label={category.label}
                value={category.label}
              />
            ))}
          </Picker>
        </InputContainer>
        <InputContainer>
          <InputMask
            type={'datetime'}
            placeholder="Digite uma data"
            value={date}
            options={{
              format: 'DD/MM/YYYY',
            }}
            onChangeText={maskedText => {
              setDate(maskedText);
            }}
            style={styles.input}
          />
        </InputContainer>
        <InputContainer>
          <Picker
            selectedValue={idAccount}
            onValueChange={selected => {
              setIdAccount(selected);
            }}
            style={styles.input}>
            {Object.keys(accounts).map(value => (
              <Picker.Item
                key={category}
                label={arrayAccounts[accounts[value].account].label}
                value={value}
              />
            ))}
          </Picker>
        </InputContainer>
        <InputContainer>
          <InputMask
            type={'money'}
            placeholder="Digite o valor"
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: '',
            }}
            value={balance}
            onChangeText={balance => {
              setBalance(balance);
            }}
            style={styles.input}
          />
        </InputContainer>
      </Form>
      {isEdition ? (
        <ContainerFormFooter>
          <BtnRemove onPress={() => askDelection()}>
            <LabelBtnRemove>Deletar Conta</LabelBtnRemove>
          </BtnRemove>
        </ContainerFormFooter>
      ) : (
        <></>
      )}
      <BtnNovaConta
        disabled={loading}
        activeOpacity={0.9}
        onPress={() => setObject()}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <LabelBtn>SALVAR</LabelBtn>
        )}
      </BtnNovaConta>
    </Container>
  );
}
