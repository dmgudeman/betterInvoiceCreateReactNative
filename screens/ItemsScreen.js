import React, { Component } from 'react';
import { View, Text , FlatList, List, ListItem} from 'react-native';
import ItemDetailsRow from '../components/ItemDetailsRow';
import { connect } from 'react-redux';
import { changeSelectedItem } from '../actions/ItemActions';
import _ from 'lodash';
import moment from 'moment';

class ItemsScreen extends Component {
  // itemsArray;
  _keyExtractor = (item, index) => index;

componentWillMount() {
    // console.log('this.props in ItemsScreen', [...this.props.items]);
    // this.itemsArray = [...this.props.items]
  }

  goToItemEdit = (item) => {
    this.props.dispatch(changeSelectedItem(item))
  
    const { navigate } = this.props.navigation
    navigate('itemEdit')
  }

  renderItem =({item})=> {
    // console.log('IN ITEMSSREEN RENEDERITEM item', item);
    item.date = moment(item.date).format("D/M/YYYY")
    return  (
       <ItemDetailsRow 
         item={item} 
         onPress={() => this.goToItemEdit(item)}/>
    )
  }
  // test=(data) =>{
  //   console.log('THIS IS A TEST', data);
  // }
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
export default connect(mapStateToProps)(ItemsScreen);
