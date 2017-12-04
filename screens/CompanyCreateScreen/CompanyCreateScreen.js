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

  onSubmit = async (props, companyCreate) => {
    await colorHexPicker(this.props.color, this.props.companyUpdate);
  
    // console.log('COMPANYCREATESCREEN ONSUBMIT this.props.hex', this.props.hex);
    // console.log('COMPANYCREATESCREEN ONSUBMIT this.props', this.props);

    let payload = {
      name:this.props.name, 
      color:this.props.color, 
      hex: this.props.hex,
      paymentTerms: this.props.paymentTerms, 
      hourly: this.props.hourly, 
      address: this.props.address, 
      fUserId: this.props.fUserId,
      companyKey: this.props.companyKey
    }

    await companyCreate(payload);
    await this.props.utilsUpdate('buttonDisabled', false)
    this.props.navigation.navigate('companies')
  }

  render() {
    const navigation = this.props.navigation
    const {name, color, hourly, address,
      companyUpdate, paymentTerms, paymentTermsOptionsList, colorOptionsList} = this.props;
    console.log('nammmmmmmmmmeeeeeee', paymentTerms);
    console.log('COMPANYCREATESCREEN RENDER this.props', this.props);
  
    return (
     <View>
         <FormLabel>Name</FormLabel>
        <TouchableOpacity>
          <FormInput 
            value={name}
            onChangeText={(value) => companyUpdate('name', value)}
          />
        </TouchableOpacity> 

        <FormLabel>Hourly</FormLabel> 
        <TouchableOpacity>
          <FormInput 
            value={hourly}
            onChangeText={(value) => companyUpdate('hourly', value)}
          />
        </TouchableOpacity>  

        <FormLabel>Payment Terms</FormLabel>
        <TouchableOpacity>
          <FormInput 
            value={paymentTerms}
            onFocus={(value) => { 
              console.log('pppppppppppppppppppppppppppppppppppppppp', paymentTerms);
              companyUpdate('paymentTermsOptionsList', paymentTermsOptionsList);
              // companyUpdate('paymentTerms', value)
              navigation.navigate('myPicker',{})
              }
            }
            editable={true}
          />
        </TouchableOpacity>


        <FormLabel>Color</FormLabel>
        <TouchableOpacity>
          <FormInput 
            value={this.props.color}
            onFocus={(value) => { 
              companyUpdate('colorOptionsList',colorOptionsList);
              companyUpdate('color', value);
              navigation.navigate('myPicker');
              }
            }
            editable={true}
          />
        </TouchableOpacity>

        <FormLabel>Address</FormLabel> 
        <TouchableOpacity>
          <FormInput 
            value={address}
            onFocus={() => { 
              this.props.navigation.navigate('googlePlacesInput')
              companyUpdate('address', value)
            }}
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

  const color = state.companies.color || '';
  const fUserId = state.auth.fUserId || '';
  const hex = state.companies.hex || '';
  const hourly = state.companies.hourly || '';
  const name = state.companies.name || '';
  const paymentTerms = state.companies.paymentTerms || '30';
  const userId = state.auth.userId || '';
  console.log('COMPANYCREATESCREEN MAPSTATETOPROPS state.companies.hex', state.companies.hex);
  console.log('COMPANYCREATESCREEN MAPSTATETOPROPS hex', hex);
  return { paymentTermsOptionsList, colorOptionsList, 
           companyKey, active, address, location, color, 
           fUserId, hex, hourly, name, paymentTerms, userId };
} 
// const mapDispatchToProps = (dispatch) => {
//   const {companyUpdate, companyCreate} = actions;
//   return bindActionCreators({companyUpdate, companyCreate}, dispatch)
// }
export default connect(mapStateToProps, actions )(CompanyCreateScreen);