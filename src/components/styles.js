import theme from '../core/theme';
import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  CenterContainer: {
    width: Dimensions.get('window').width,
    display: 'flex',
    alignItems: 'center',
  },
  CenterText: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    textAlign: 'center',
  },
  Colors: {
    primary: '#A0EAB9',
    secondary: '#006A42',
    third: '#6FF484',
    error: '#f13a59',
    black: '#140C10',
  },

  buttonWidths: {
    width: 250,
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 20,
  },

  font: {
    fontFamily: 'Poppins Regular',
  },

  button:{
        borderRadius: 20,
        alignItems: 'center',
        width: 250,
        paddingVertical: 20,
        marginVertical: 30,
        elevation: 10
  }
});

export default styles;
