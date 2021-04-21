import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadAccounts} from '../../store/accounts/actions';
import Tabs from '../../components/Tabs';
import colors from '../../styles/colors';
import {getDate} from '../../utils/FunctionUtils';

import {
  Container,
  CompHead,
  TxtSaldo,
  TxtDescricao,
  Progressbar,
  ContainerSaldo,
  Cifra,
} from './styles';
import SlideBanners from '../../components/SlideBanners';
import {loadTransactions} from '../../store/transactions/actions';

export default Dash = ({navigation}) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);

  useEffect(() => {
    getDate().then((date) =>
      dispatch(
        loadTransactions({month: Number(date.month), year: Number(date.year)}),
      ),
    );
    // sumTotalValue();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundColorPrimary}
      />
      <CompHead>
        <TxtDescricao>Saldo disponível</TxtDescricao>
        <ContainerSaldo>
          <Cifra>R$</Cifra>
          <TxtSaldo>1</TxtSaldo>
        </ContainerSaldo>
        <Progressbar
          styleAttr="Horizontal"
          color={colors.greenApp}
          indeterminate={false}
          progress={0.8}
        />
      </CompHead>
      <SlideBanners
        cards={[{titleHead: 'Últimas Transações', transactions: transactions}]}
      />
      <Tabs navigation={navigation} />
    </Container>
  );
};

Dash.navigationOptions = {
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: (sceneProps) => {
      const {layout, position, scene} = sceneProps;
      const {index} = scene;

      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return {opacity, transform: [{translateX: translateX}]};
    },
  }),
};
