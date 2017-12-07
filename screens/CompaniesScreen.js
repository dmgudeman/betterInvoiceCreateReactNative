import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { debounce } from 'underscore';
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import { View, Text, ListView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as actions from '../actions';
import ListItem from '../components/ListItem'
// import { Button } from '../components/common';


class CompaniesScreen extends Component {
  componentWillMount() {
    this.props.fetchCompanies(this.props.fUserId);
  }

  componentDidMount() {
    this.props.fetchCompanies(this.props.fUserId)
  }
  
  renderItem =({item, index})=> {
    this.toggleButton = false
    // console.log('CompaniesScreen renderItem  this.props.index =', this.props.companies);
    // console.log('COMPANIESSCREEN renderItem item, item.id, index', item, item.id, index);
    return  (
      <ListItem company={item} navigation={this.props.navigation}/>
    )
  }

  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Companies',
    headerRight:
        <Button
          title= "+Business"
          onPress={()=>{navigation.navigate('companyCreate')}}
        />
        ,
        headerLeft: null
    }
   
  }
  render() {
    // console.log('CompaniesScreen render  this.props.companies =', this.props.companies);
    const navigation = this.props.navigation
    return (
      <View style={{height: '100%'}}>
        <FlatList
          data = {this.props.companies}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const fUserId = state.auth.fUserId || '';
  
  const companies = _.map(state.companies.companies, (val, id) => {
    return { ...val, id};
  });

  return {
    fUserId,
    companies,
  }
}

export default connect(mapStateToProps, actions)(CompaniesScreen);