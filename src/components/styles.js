import theme from '../core/theme';
import {StyleSheet, Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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

  fontSub: {
    fontFamily: 'Poppins Regular',
    fontSize: 20,
    color: 'white'
    
  },

  fontHome: {
    fontFamily: 'Poppins Bold',
    fontSize: 40,
    color: 'green'
    
  },
  fontText: {
    fontFamily: 'Poppins Regular',
    fontSize: 18,
  },

  fontField: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: 'white',
    
    
  },

  button:{
        borderRadius: 20,
        alignItems: 'center',
        width: 250,
        paddingVertical: 20,
        marginVertical: 30,
        elevation: 10
  },

  errorTxt: {
    fontFamily: 'Poppins Regular',
    fontSize: 10,
    color: 'red'
  },

 
  submitBtn:{
    backgroundColor: '#6FF484',
    borderRadius: 10,
    justifyContent: 'center',
    width: wp(80),
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
    
    
  },
  loaderContainer: {
    
    display: 'flex',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  }, 
  appointDisp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    position: 'relative', 
    bottom: 1
  }, 
  textAppoint: {
    paddingTop: 100, 
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins Bold', 
    position: 'relative', 
    bottom: 0, 
    fontSize: 26,
    color: 'black'
  }
});

export default styles;
