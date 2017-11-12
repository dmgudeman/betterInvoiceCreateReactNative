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
    // console.log('ITEMS SCREEN goToItemEdit data.coId', data.coId);
    // console.log('ITEMS SCREEN goToItemEdit state)', store.getState());
    this.props.selectItem(data);
  
    const { navigate } = this.props.navigation
    navigate('itemEdit')
  }

  renderItem =({item})=> {
     console.log('IN ITEMSSREEN RENEDERITEM {item}', {item});
    item.date = moment(item.date).format("D/M/YYYY")
    return  (
       <ItemDetailsRow 
         item={item} 
         onPress={() => this.goToItemEdit({item})}/>
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
