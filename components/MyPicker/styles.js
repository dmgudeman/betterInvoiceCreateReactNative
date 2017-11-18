

import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({

    container: {
      marginTop: 30,
      marginLeft: 30,
      marginBottom: 10,
    },
    textStyle: {
      color: 'red',
      marginLeft: 30,
      marginBottom:5,
    
    },
    inputStyle: {
      color: '#000',
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 18,
      lineHeight: 23,
      flex: 2
    },
    labelStyle: {
      fontSize: 16,
      marginBottom:5,
      paddingLeft: 5,
    },
    containerStyle: {
      height: 40,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'green',
      paddingLeft: 10,
      paddingRight: 10,
    }
  });