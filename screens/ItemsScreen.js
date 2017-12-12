import React, { Component } from 'react';
import { View, Text , FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemDetailsRow from '../components/ItemDetailsRow';
import { connect } from 'react-redux';
import { selectItem } from '../actions/ItemActions';
import _ from 'lodash';
import moment from 'moment';
import store from '../store';
import * as actions from '../actions';

class ItemsScreen extends Component {

  componentWillMount(){
    console.log('1 ITEMS CWM this.props', this.props);
    this.props.utilsUpdate('goBackKey', this.props.navigation.state.key)
    console.log('2 ITEMS CWM this.props', this.props);

  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Items',
      headerLeft: <Icon.Button 
        name="angle-left" 
        backgroundColor="transparent" 
        color="gray" 
        size={40}
        onPress= {  _.debounce(()=> navigation.goBack(), 1000,{'leading':true, 'trailing':true}) }
      />,
        
    }
  }

  goToItemEdit = (data) => {
    const { amount, companyKey, comppany, coName, date, description, fUserId, goBackKey, hours, total, id } = data;
    const item = { amount, companyKey, company, coName, date, description, fUserId, goBackKey, hours, total, id };

    this.props.selectItem(item)
  
    const { navigate } = this.props.navigation
    navigate('itemEdit', {'goBackKey': this.props.goBackKey })
  }

  renderItem =(item)=> {
    const data = this.props.items[item.index];
    console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIITEMS RENDERITEM data', data);
    return  (
      <ItemDetailsRow
        data = {data} 
        onPress={() => this.goToItemEdit(data)}/>
    )
  }
  _keyExtractor = (item, index) => index;

  render() {
    return (
      <View style={{height: '100%'}}>
        <FlatList 
          data = {this.props.items}
          keyExtractor = {this._keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
const mapStateToProps = state => {
  console.log('ITEMS MSTP state', state);
  const company = state.companies.company || '';
  const companyKey = state.companies.company.companyKey || state.companies.company.id;
  const coName = state.companies.company.name || '';
  const fUserId = state.auth.fUserId || '';
  const goBackKey = state.utils.goBackKey || '';
  const items = _.map(state.item.items, (val, id) => {
    return { ...val, id};
  });
  return { company, companyKey, fUserId, goBackKey, items, coName};
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,

  }
})

export default connect(mapStateToProps, actions )(ItemsScreen);
