import React, { Component } from 'react';
import { View, Text , FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemDetailsRow from '../components/ItemDetailsRow';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import store from '../store';
import * as actions from '../actions';

class ItemsScreen extends Component {

  componentWillMount=async()=>{
   await  this.props.utilsUpdate('goBackKey', this.props.navigation.state.key)
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
    console.log('ITEMS SCREEN GOTOITEMEDIT data', data);
    const { amount, companyKey,  date, description, fUserId, goBackKey, hours, total, itemKey } = data;
    const item = { amount, companyKey, date, description, fUserId, goBackKey, hours, total, itemKey };

    this.props.setItem(item)
  
    const { navigate } = this.props.navigation
    navigate('itemEdit', {'goBackKey': goBackKey })
  }

  renderItem =(item)=> {
    const data = this.props.items[item.index];
    data.goBackKey = this.props.goBackKey;
    return  (
      <ItemDetailsRow
        data = {data} 
        onPress={() => {
          console.log('ITEMS SCREEEN item', data);
          this.goToItemEdit(data)}}/>
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
  if (state.company){
  const company = state.company || '';
  const companyKey = state.company.companyKey || state.company.id;
  const name = state.company.name || '';
  const fUserId = state.auth.fUserId || '';
  const goBackKey = state.utils.goBackKey || '';
  const items = _.map(state.company.items, (val, id) => {
    return { ...val, id};
  }) || {};
  return { company, companyKey, fUserId, goBackKey, items, name};
}
return state;
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
  }
})

export default connect(mapStateToProps, actions )(ItemsScreen);
