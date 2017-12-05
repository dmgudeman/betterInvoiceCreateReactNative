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
import { withNavigation,NavigationActions }       from 'react-navigation';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import ModalSelector            from 'react-native-modal-selector'
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
    this.props.companyUpdate('companyKey','')
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
    let index = 0;
    const data = [
        { key: index++, section: true, label: 'Colors' },
        { key: index++, label: 'blue' },
        { key: index++, label: 'green' },
        { key: index++, label: 'red' },
        { key: index++, label: 'purple' },
        { key: index++, label: 'brown' },
        { key: index++, label: 'yellow' },
    ];
    
    const navigation = this.props.navigation
    const {name, color, hourly, address,
      companyUpdate, paymentTerms, paymentTermsOptionsList, colorOptionsList} = this.props;
    console.log('nammmmmmmmmmeeeeeee', paymentTerms);
    console.log('COMPANYCREATESCREEN RENDER this.props', this.props);
    console.log('addrrrrrrrrrrrreeeeeeeeesssssssssss', address);
  
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
              console.log('COMPANYCREATESCREEN RENDER paymentTerms', paymentTerms);
              console.log('COMPANYCREATESCREEN this.props.navigation', this.props.navigation);
              console.log('');
              companyUpdate('paymentTermsOptionsList', paymentTermsOptionsList);
              companyUpdate('list', paymentTermsOptionsList )
              companyUpdate('listName', 'paymentTermsOptionsList')
              //can't use companyUpdate for paymentTerms it returns a proxy
              // companyUpdate('paymentTerms', value)
              navigation.navigate('myPicker',{
                prop:'paymentTerms', 
                propValue: this.props.paymentTerms,
              } )
              }
            }
            editable={true}
          />
        </TouchableOpacity>


        <FormLabel>Color</FormLabel>
        <TouchableOpacity>
        <ModalSelector
                    data={data}
                    initValue="Select something yummy!"
                    // supportedOrientations={['landscape']}
                    onChange={(option)=>{ 
                      console.log('pppppppppppppppppppppppppppppppppppppppp',color);
                      // companyUpdate('paymentTermsOptionsList', colorOptionsList);
                      // companyUpdate('list', colorOptionsList )
                      // companyUpdate('listName', 'colorOptionsList')
                      companyUpdate('color', option.label)
                    }
                  }
                  >

          <FormInput 
            value={this.props.color}
            style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
            editable={false}
            placeholder="color"
            editable={true}
          />
          </ModalSelector>
        </TouchableOpacity>

        <FormLabel>Address</FormLabel> 
        <TouchableOpacity>
          <FormInput 
            value={address}
            onFocus={(value) => { 
              console.log('COMPANYCREATESCREEN ADDRESS INPUT', address);
              console.log('COMPANYCREATESCREEN ADDRESS VALUE', value);
              // using a workaround here because companyUpdate returns a proxy for address instead of a string
              this.props.navigation.navigate('googlePlacesInput', {address: value})
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
  const paymentTermsOptionsList = ["30", "15", "5"] ;
  const colorOptionsList = ['blue', 'green', 'yellow', 'purple', 'brown', 'red']
 
  const active = state.companies.active || true;
  const address = state.companies.address || '';
  const color = state.companies.color || '';
  const companyKey = state.companies.key || '';
  const fUserId = state.auth.fUserId || '';
  const hex = state.companies.hex || '';
  const hourly = state.companies.hourly || '';
  const location = state.location || null;
  const name = state.companies.name || '';
  const paymentTerms = state.companies.paymentTerms || '30';
  const userId = state.auth.userId || '';
  const textInputValue = state.companies.textInputValue || '';
  console.log('COMPANYCREATESCREEN MAPSTATETOPROPS state.companies.hex', state.companies.hex);
  console.log('COMPANYCREATESCREEN MAPSTATETOPROPS hex', hex);
  return { paymentTermsOptionsList, colorOptionsList, 
           companyKey, active, address, location, color, 
           fUserId, hex, hourly, name, paymentTerms, userId, textInputValue };
} 
// const mapDispatchToProps = (dispatch) => {
//   const {companyUpdate, companyCreate} = actions;
//   return bindActionCreators({companyUpdate, companyCreate}, dispatch)
// }
export default connect(mapStateToProps, actions )(CompanyCreateScreen);