import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import { View, Text, ListView, FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as actions from '../actions';
import ListItem from '../components/ListItem'

class CompaniesScreen extends Component {
  
  componentWillMount() {
    this.props.fetchCompanies(this.props.fUserId)
    // console.log('CompaniesScreen componentWillMount this.props', this.props);
  }
  componentDidMount() {
    this.props.fetchCompanies(this.props.fUserId)
    // console.log('CompaniesScreen componentWillMount this.props', this.props);
  }
  // goToCompanyCreate =  () =>  {


  //   navigation.navigate('companyCreate'); 
  // }
  

  renderItem =({item, index})=> {
    // console.log('CompaniesScreen renderItem  this.props.index =', this.props.companies);
    // console.log('COMPANIESSCREEN renderItem item, item.id, index', item, item.id, index);
    return  (
    <ListItem company={item} navigation={this.props.navigation}/>
    )
  }
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Companies',
    headerLeft: null,
    headerRight:
        <Button
          title= "+Business"
          onPress={()=>{navigation.navigate('companyCreate')}}
        />
    }
  }
  // _keyExtractor = () =>  (item, index) => {
  //   console.log('COMPANIESSCREEN keyExtractor item, index', item,index);
  //   return index;
  // }
  render() {
    // console.log('CompaniesScreen render  this.props.companies =', this.props.companies);
    const navigation = this.props.navigation
    return (
     <View> 
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
  // console.log('COmpanies screen state.auth', state.auth);
  const companies = _.map(state.companies.companies, (val, id) => {
    return { ...val, id};
  });

  return {
    fUserId: state.auth.fUserId,
    companies
  }
}

export default connect(mapStateToProps, actions)(CompaniesScreen);