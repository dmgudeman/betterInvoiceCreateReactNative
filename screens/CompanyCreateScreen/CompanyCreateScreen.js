import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  StyleSheet,
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  Picker,
}                               from 'react-native';
import { connect }              from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import moment                   from 'moment';
import * as actions             from '../../actions';
import { MyPicker  }            from '../../components/MyPicker/MyPicker';
import colorHexPicker           from '../../assets/ColorHexUpdater';
import AddressInput             from '../../components/AddressInput/AddressInput';

class CompanyCreateScreen extends Component {

  componentWillMount() {
    this.props.companyUpdate('name', '');
    this.props.companyUpdate('paymentTerms', '');
    this.props.companyUpdate('color', 'blue');
    this.props.companyUpdate('hourly', '');
    this.props.companyUpdate('address', '');
    this.props.companyUpdate('companyKey',)
  }

  // paymentTermsOptionsList =''
  // constructor(props) {
  //   super(props);
  //   this.state = {language: ''};
    
  // }
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'New Company',
    }
  }
  onSubmit(props, companyCreate) {
    let payload = {
      name:props.name, 
      color:props.color, 
      paymentTerms: props.paymentTerms, 
      hourly: props.hourly, 
      address: props.address, 
      fUserId: props.fUserId,
      companyKey: props.companyKey
    }

    companyCreate(payload);
    this.props.navigation.navigate('companies', { ButtonDisabled: false})
  }

  render() {
    const navigation = this.props.navigation
    return (
     <View>
         <FormLabel>Name</FormLabel>
        <TouchableOpacity>
          <FormInput 
            value={this.props.name}
            onChangeText={(value) => this.props.companyUpdate('name', value)}
          />
        </TouchableOpacity> 

        <FormLabel>Hourly</FormLabel> 
        <TouchableOpacity>
          <FormInput 
            value={this.props.hourly}
            onChangeText={(value) => this.props.companyUpdate('hourly', value)}
          />
        </TouchableOpacity>  

        <FormLabel>Payment Terms</FormLabel>
        <TouchableOpacity>
          <FormInput 
            value={this.props.paymentTerms}
            onFocus={() => { navigation.navigate('myPicker',{prop:'paymentTerms', value: this.props.paymentTerms, optionsList: this.props.paymentTermsOptionsList} )}}
            editable={true}
          />
        </TouchableOpacity>

        <FormLabel>Color</FormLabel>
        <TouchableOpacity>
          <FormInput 
            value={this.props.color}
            onFocus={() => { 
              navigation.navigate('myPicker',{ prop:'color', value: this.props.color, optionsList: this.props.colorOptionsList} )}}
            editable={true}
          />
        </TouchableOpacity>

        <FormLabel>Address</FormLabel> 
        <TouchableOpacity>
          <FormInput 
            value={this.props.address}
            onFocus={() => { this.props.navigation.navigate('googlePlacesInput', {address:this.props.address})}}
            editable={true}
          />
        </TouchableOpacity>   
        

        <Button
          title= "Submit"
          onPress =  {() => this.onSubmit(this.props, this.props.companyCreate) }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formLabel: {
    fontSize: 20,
    fontWeight: "600",
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
    margin: 25
  },
  pickerText: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red',
  },
  picker: {
    height: 20,
    width: 100
  },
  button: {
    backgroundColor: 'white'
  }
});

const mapStateToProps = (state) => {
  const paymentTermsOptionsList = [{option: ''}, {option: "30"}, {option: "15"}, {option: "5"}] ;
  const colorOptionsList = [{option:'blue'}, {option:'green'},{option:'yellow'}, {option: 'purple'},{option: 'brown'},{option: 'red'}]
  const active = state.companies.active || true;

  const companyKey = state.companies.key || '';
  const address = state.companies.address || '';
  const location = state.location || null;

  const color = state.companies.color || 'blue';
  const fUserId = state.auth.fUserId || '';
  const hourly = state.companies.hourly || '';
  const name = state.companies.name || '';
  const paymentTerms = state.companies.paymentTerms || '30';
  const userId = state.auth.userId || '';
  
  return { paymentTermsOptionsList, colorOptionsList, 
           companyKey, active, address, location, color, 
           fUserId, hourly, name, paymentTerms, userId };
} 
const mapDispatchToProps = (dispatch) => {
  const {companyUpdate, companyCreate} = actions;
  return bindActionCreators({companyUpdate, companyCreate}, dispatch)
}
export default connect(mapStateToProps, actions )(CompanyCreateScreen);