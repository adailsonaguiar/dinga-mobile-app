import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadAccounts} from '../../store/accounts/actions';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs';

import {
  Container,
  CompHead,
  TxtSaldo,
  TxtDescricao,
  Progressbar,
} from './styles';

export default Dash = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAccounts());
  });
  return (
    <Container>
      <Header title="Finax" />
      <StatusBar barStyle="light-content" backgroundColor="#283B47" />
      <CompHead>
        <TxtDescricao>Saldo Receitas</TxtDescricao>
        <TxtSaldo>R$ 9.857,96</TxtSaldo>
        <Progressbar
          styleAttr="Horizontal"
          color="#E74C3C"
          indeterminate={false}
          progress={0.5}
        />
        <Tabs navigation={navigation} />
      </CompHead>
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
