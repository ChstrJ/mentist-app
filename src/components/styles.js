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

  fontTitle: {
    fontFamily: 'Poppins Bold',
    fontSize: 25,
    color: 'white'
    
  },

  fontText: {
    fontFamily: 'Poppins Regular',
    fontSize: 18,
  
    
  },

  fontField: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: 'white'
    
  },

  button:{
        borderRadius: 20,
        alignItems: 'center',
        width: 250,
        paddingVertical: 20,
        marginVertical: 30,
        elevation: 10
  },

 
  submitBtn:{
    backgroundColor: '#6FF484',
    borderRadius: 10,
    justifyContent: 'center',
    width: 350,
    paddingVertical: 10,
    marginVertical: 30,
    
    
  },

  submitBtnTxt:{
    
    textAlign: 'center',
    
    
  },

  lottieLoader: {
    height: 800,
    width: 500,
    alignSelf: 'center',
    justifyContent: 'center',
    opacity: 0.4,
    zIndex: 1,
    backgroundColor: "#6FF484"
    
    
  }

});

export default styles;
