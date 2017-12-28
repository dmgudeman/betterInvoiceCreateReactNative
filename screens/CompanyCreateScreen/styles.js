
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 30,
    height: 20,
    backgroundColor: 'green',
  },
  inputBox: {
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'red',
  },
  border: {
    height: 50,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
  },
  location: {
    backgroundColor: 'white',
    margin: 25,
  },
  pickerText: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red',
  },
  picker: {
    height: 20,
    width: 100,
  },
  button: {
    backgroundColor: 'white',
  },
  disabled: {
    backgroundColor: '#34495e80',
  },
});

export default styles;
