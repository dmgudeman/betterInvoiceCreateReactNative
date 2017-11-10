import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { View, Text, ListView, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import * as actions from '../actions';
import ListItem from '../components/ListItem'

class CompaniesScreen extends Component {
  
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.fetchCompanies(this.props.fUserId)
    // console.log('CompaniesScreen componentWillMount this.props', this.props);
  }
  componentDidMount() {
    this.props.fetchCompanies(this.props.fUserId)
    // console.log('CompaniesScreen componentWillMount this.props', this.props);
  }
  
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //   title: 'Companies',
  //   headerRight:
  //       <Button
  //         title= "+Business"
  //         onPress={()=>{navigation.navigate('companyCreate')} 
  //         }
  //       />
  //   }
  // }

  renderItem =({item, index})=> {
    // console.log('CompaniesScreen renderItem  this.props =', this.props);
    return  (
    <ListItem company={item} navigation={this.props.navigation}/>
    )
  }

  render() {
    // console.log('CompaniesScreen render  this.props.companies =', this.props.companies);
    const navigation = this.props.navigation
    return (
     <View> 
        <FlatList 
          data = {this.props.companies}
          renderItem={this.renderItem}
          keyExtractor={ item => item }
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  console.log('COmpanies screen state.auth', state.auth);
  const companies = _.map(state.companies.companies, (val, id) => {
    return { ...val, id};
  });

  return {
    fUserId: state.auth.fUserId,
    companies
  }
}

export default connect(mapStateToProps, actions)(CompaniesScreen);