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
    console.log('ITEMS SCREEN goToItemEdit this.props', this.props);


    const {amount, companyKey, coName, date, description, fUserId, hours, total, id} = data;
    const item = {amount, companyKey, coName, date, description, fUserId, hours, total, id};
    // console.log('ITEMS SCREEN goToItemEdit item', item);

    this.props.selectItem(item)
  
    const { navigate } = this.props.navigation
    navigate('itemEdit', {coName})
  }

  renderItem =(item)=> {
    // console.log('ItemsScreen this.props.items[item.index].date', this.props.items[item.index].date);
    const data = this.props.items[item.index];
    console.log('ItemsScreen renderItem data', data);
    // data.date = moment(data.date).format("L");
    console.log('ItemsScreen renderItem data.date', data.date);
    data.date = moment(data.date).format("L");
    console.log('ItemsScreen renderItem data.date', data.date);
    return  (
       <ItemDetailsRow
         data = {data} 
         onPress={() => this.goToItemEdit(data)}/>
    )
  }
  _keyExtractor = (item, index) => index;


  render() {
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
  const companyKey = state.companies.company.id;
  const coName = state.companies.company.name;
  // console.log('ItemsScreen mapStateToProps Object.keys(state.companies.companies)[0]', Object.keys(state.companies.companies)[0]);
  // console.log('ItemsScreen mapStateToProps companyKey', companyKey);
  // console.log('ItemsScreen mapStateToProps state', state);
  // console.log('ItemsScreen mapStateTOProps coName',coName);
  const  fUserId = state.auth.fUserId;
  const items = _.map(state.companies.company.items, (val, id) => {
    return { ...val, id};
  });
  console.log('ITEMSSCREEN MAPSTATETOPROPS items', items);
  return { fUserId, companyKey, items, coName};
}

export default connect(mapStateToProps, {selectItem})(ItemsScreen);
