import React, { Component } from 'react';
import { View, Text , FlatList, List, ListItem} from 'react-native';
import ItemDetailsRow from '../components/ItemDetailsRow';
import { connect } from 'react-redux';
import { selectItem } from '../actions/ItemActions';
import _ from 'lodash';
import moment from 'moment';
import store from '../store'

class ItemsScreen extends Component {
  // itemsArray;


componentWillMount() {
    // console.log('this.props in ItemsScreen', [...this.props.items]);
    console.log('ITEMSCREEN componentWillMount this.props', this.props);
    // this.itemsArray = [...this.props.items]
  }

  goToItemEdit = (data) => {
    console.log('ITEMS SCREEN goToItemEdit data', data);
    const {amount, coId, date, description, fUserId, hours, total, id}= data;
    const item = {amount, coId, date, description, fUserId, hours, total, id};
    console.log('ITEMS SCREEN goToItemEdit data', item);
    // console.log('ITEMS SCREEN goToItemEdit state)', store.getState());

    this.props.selectItem(item)
  
    const { navigate } = this.props.navigation
    navigate('itemEdit')
  }

  renderItem =(item)=> {
     console.log('IN ITEMSSREEN RENEDERITEM item.index', item.index);
     const data = this.props.items[item.index];
    
     console.log('data', data);

    data.date = moment(data.date).format("D/M/YYYY")
    return  (
       <ItemDetailsRow
         data = {data} 
         onPress={() => this.goToItemEdit(data)}/>
    )
  }
  _keyExtractor = (item, index) => index;


  render() {
    //  console.log('this.props.itemsssss', this.props.items);  
    return (
        <FlatList 
          data = {this.props.items}
          keyExtractor = {this._keyExtractor}
          renderItem={this.renderItem}
        />
    )
  }
}
const mapStateToProps = state => {
  const coId = Object.keys(state.companies.companies)[0];
  const  fUserId = state.auth.fUserId;
  const items = _.map(state.companies.companies[coId].items, (val, id) => {
    return { ...val, id};
  });
  
  // console.log('ITEMSSSSSS', items, 'coId', coId);
 
  return { fUserId, coId, items};
}

export default connect(mapStateToProps, {selectItem})(ItemsScreen);
