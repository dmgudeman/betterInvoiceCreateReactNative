import Picker from 'react-native-picker';
let data = [];
for(var i=0;i<100;i++){
    data.push(i);
}
const MyPicker2 = () => {
Picker.init({
    pickerData: data,
    selectedValue: [59],
    onPickerConfirm: data => {
        console.log(data);
    },
    onPickerCancel: data => {
        console.log(data);
    },
    onPickerSelect: data => {
        console.log(data);
    }
});
Picker.show();

}
const styles = {
  picker: {
    height: 30,
    width: 100
  }
}
export default MyPicker2;