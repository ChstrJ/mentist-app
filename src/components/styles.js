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
  },

  errorText:{
    fontSize: 15,
    color: '#FF0D10',
    marginTop: 5,
  },

  submitBtn:{
    // backgroundColor: '#6FF484',
    borderRadius: 10,
    justifyContent: 'center',
    width: 350,
    paddingVertical: 20,
    marginVertical: 30,
    elevation: 10
  },

  submitBtnTxt:{
    
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins Regular',
    fontWeight: 'bold',
  }

});

export default styles;
