import colors from './colors';
import StyleSheet from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2ff',
    flex: 1,
  },
  stackBar: {
    backgroundColor: '#f39c12ff',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 20,
    paddingEnd: 20,
  },
  stackBar_start: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-start',
  },
  stackBar_end: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
  },
  txtStack: {
    color: '#fff',
    alignSelf: 'flex-end',
  },
  viewSaldo: {
    backgroundColor: '#f39c12ff',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
  },
  txtSaldo: {
    color: 'white',
    fontWeight: '500',
    fontSize: 25,
  },
  txtDescricao: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
  viewGeral: {
    backgroundColor: 'white',
    height: 200,
    margin: 10,
    borderRadius: 25,
    padding: 20,
  },
  viewRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  viewRowDescription: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-start',
  },
});

export {styles};
