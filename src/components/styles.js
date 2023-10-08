import theme from '../core/theme';
import {StyleSheet, Dimensions} from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
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
    color: '#333333'
  },
  fontBtn: {
    fontFamily: 'Poppins Bold',
    fontSize: 22,
    color: '#333333'   
  },
  fontSub: {
    fontFamily: 'Poppins Regular',
    fontSize: 20,
    color: '#333333'    
  },
  fontHome: {
    fontFamily: 'Poppins Bold',
    fontSize: 40,
    color: '#00A556'    
  },

  fontHomeSub: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#333333'

  },
  fontText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  fontField: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
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
    color: 'red',
  },
  submitBtn:{
    backgroundColor: '#00A556',
    borderRadius: 15,
    justifyContent: 'center',
    width: wp(80),
    height: hp(10),  
    marginVertical: 30,
  },

  Btn2:{
    backgroundColor: '#fff',
    borderWidth: '1',
    borderColor: '#00A556',
    borderRadius: 15,
    justifyContent: 'center',
    width: wp(80),
    height: hp(10),  
    marginVertical: 30,
  },

  submitBtnTxt:{
    textAlign: 'center',
  },
  lottieLoader: {
    height: 500,
    width: 300,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    zIndex: 1,
  },
  lottieSmall: {
    height: hp(43),
    width: 250,
    alignSelf: 'center',
    justifyContent: 'center',
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
  }, 
});

export const modalStyle = StyleSheet.create({
  centerView: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
    
  }, 
  modalView: {
    width: 300, 
    height: 300, 
    backgroundColor: 'white', 
    color: 'black', 
    borderWidth: 1, 
    borderColor: '#000', 
    borderRadius: 20, 
  }, 
  modalTitle: {
    height: 50, 
    justifyContent: 'center', 
    alignContent: 'center', 
    backgroundColor: 'white', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
  }, 
  modalBody: {
    height: 200, 
    justifyContent: 'center', 
    alignItems: 'center'
  }, 
  modalTextTitle: {
    color: '#000', 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    alignItems: 'center'
  }, 
  modalTextBody: {
    color: '#000', 
    fontSize: 20, 
    margin: 10, 
    textAlign: 'center', 
    alignItems: 'center'
  }
})
