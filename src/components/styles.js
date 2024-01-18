
import {StyleSheet, Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { scale as s, verticalScale as vs, moderateScale as ms } from 'react-native-size-matters';

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
    fontSize: s(23),
    color: '#333333'
  },
  fontBtn: {
    fontFamily: 'Poppins Bold',
    fontSize: s(18),
    color: '#333333'   
  },
  fontSub: {
    fontFamily: 'Poppins Regular',
    fontSize: s(20),
    color: '#333333'    
  },

  fontSmol: {
    fontFamily: 'Poppins Regular',
    fontSize: s(14),
    color: 'gray'    
  },

  fontArticles: {
    fontFamily: 'Poppins Regular',
    fontSize: s(11),
    color: 'gray'    
  },

  fontSmolLabel: {
    fontFamily: 'Poppins Regular',
    fontSize: s(14),
    color: 'white'    
  },

  fontSmolGreen: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: s(16),
    color: 'limegreen',
    
   
   
  },

  fontHome: {
    fontFamily: 'Poppins Bold',
    fontSize: s(35),
    color: '#00A556'    
  },

  fontHomeSub: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: s(15),
    color: '#333333'
  },

  fontProgress: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: s(17),
    color: '#333333',
    paddingHorizontal: 5,
  },

  fontProgressSub: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: s(13),
    color: '#333333',
    marginLeft: s(17),
    
    
  },

  fontSubHelp: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: s(18),
    color: '#333333'
  },

  fontSubGrey: {
    fontFamily: 'Poppins Regular',
    fontSize: s(15),
    color: 'grey'
  },

  fontText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: s(14),
    
  },
  fontField: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: s(14),
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
    fontSize: 13,
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
    marginVertical: 15,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins Bold', 
    bottom: 0, 
    fontSize: 25,
    color: 'black',
  }, 

  textAppointBody: {
    fontSize: 18,
    marginLeft: 7 ,
    fontFamily: 'Poppins-SemiBold', 
    marginVertical: 10,
    color: 'black'

  }, 

  consultantLabel: {
    fontSize: s(17),
    marginLeft: 10,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 10,
    color: 'black',
  },
  conName: {
    fontSize: s(15),
    fontFamily: 'Poppins-Medium',
    color: 'black',
    marginLeft: 5
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
    height: 310, 
    backgroundColor: 'white', 
    borderRadius: 20, 
    elevation: 20,
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
    fontSize: 18, 
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center', 
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    
  }, 
  modalTextBody: {
    color: '#000', 
    fontSize: 20, 
    margin: 10, 
    textAlign: 'center', 
    alignItems: 'center',
    padding: 10
    
  }
})
