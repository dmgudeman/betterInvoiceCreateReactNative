import React, { Component } from 'react';
import { View, Text , FlatList, List, ListItem} from 'react-native';
import ItemDetailsRow from '../components/ItemDetailsRow';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';
import moment from 'moment';

class ItemsScreen extends Component {
  itemsArray;
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // console.log('this.props in ItemsScreen', [...this.props.items]);
    this.itemsArray = [...this.props.items]
    // console.log('this.itemsArray', this.itemsArray);
    // this.props.fetchItems(this.props.fUserId, this.props.coId)
  }
  renderItem =({item})=> {
    console.log('IN ITEMSSREEN RENEDERITEM item', item);
    item.date =moment(item.date).format("D/M/YYYY")
    return  (
       <ItemDetailsRow item={item} navigation={this.props.navigation}/>
    )
  }
  test=(data) =>{
    console.log('THIS IS A TEST', data);
  }
  render() {
     console.log('this.props.itemsssss', this.props.items);  
    return (
        <FlatList 
          data = {this.props.items}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
        />
    )
  }
}
const mapStateToProps = state => {
  console.log('State in ItemsScreen', state);
  const coId = Object.keys(state.companies.companies)[0];

  const  fUserId = state.auth.fUserId;
  const items = _.map(state.companies.companies[coId].items, (val, id) => {
    return { ...val, id};
  });
  
  console.log('ITEMSSSSSS', items, 'coId', coId);
 
  return { fUserId, coId, items};
}
export default connect(mapStateToProps, actions)(ItemsScreen);
