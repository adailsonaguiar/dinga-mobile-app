import React, {useState, useEffect} from 'react';
import {StatusBar, ActivityIndicator, Alert} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import messageResponse from './../../utils/messageResponse';
import colors from '../../styles/colors';
import getRealm from './../../services/realm';
import accounts from '../../utils/accounts';
import {useDispatch} from 'react-redux';
import {loadAccounts} from '../../store/accounts/actions';
import {getDate} from '../../utils/FunctionUtils';

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
} from './styles';

import standard_icon from './../../assets/contas/standard_icon.png';

export default function ContaForm({navigation}) {
  const {state} = navigation;
  const [contas] = useState(accounts);
  const [description, setDescription] = useState('');
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState('');
  const [icon, setIcon] = useState(standard_icon);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [isEdition, setEdit] = useState(false);
  const [day, setday] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getDate().then((date) => {
      setday(date.day);
      setMonth(date.month);
      setYear(date.year);
    });
    const params = state ? state.params : null;
    const detectionAccountParams = () => {
      if (account) {
        setEdit(true);
        return true;
      }
      return false;
    };
    const getAccountEdit = () => {
      setAccount(params.account.account);
      setId(params.account.id);
      setDescription(params.account.description);
      setBalance(params.account.balance / 100);
    };
    if (detectionAccountParams()) {
      setTimeout(() => {
        getAccountEdit();
      }, 500);
    }
  }, []);

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
    if (typeof balance == 'string') {
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
        backgroundColor={colors.colorStandardPrimary}
      />
      <HeaderForm>
        <TxtHeaderForm>
          {isEdition ? 'ATUALIZAR CONTA' : 'NOVA CONTA'}
        </TxtHeaderForm>
        <BtnFechar
          onPress={async () => {
            navigation.goBack();
          }}>
          <Icon name="close" color="#fff" size={30} />
        </BtnFechar>
      </HeaderForm>
      <ContainerIcon>
        <ImgConta source={icon} />
      </ContainerIcon>
      <Form>
        <InputContainer>
          <Picker
            selectedValue={account}
            onValueChange={(selected) => {
              setPropertyAccount(selected);
            }}
            style={styles.input}>
            <Picker.Item label="Carteira" value="000" />
            <Picker.Item label="Banco do Brasil - 001" value="001" />
            <Picker.Item label="Caixa Econômica - 104" value="104" />
            <Picker.Item label="Nuconta - 260" value="260" />
            <Picker.Item label="Bradesco - 204" value="204" />
            <Picker.Item label="Santander - 033" value="033" />
            <Picker.Item label="Itaú - 341" value="341" />
          </Picker>
        </InputContainer>
        <Input
          placeholder="Descrição"
          value={description}
          onChangeText={(description) => {
            setDescription(description);
          }}
        />
        <InputContainer>
          <TextInputMask
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
