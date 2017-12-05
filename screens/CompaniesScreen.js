import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import { View, Text, ListView, FlatList, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as actions from '../actions';
import ListItem from '../components/ListItem'
import { Header, Button } from '../components/common';

function goToCreateCompany(){
  
    // console.log('COMPANIESSCREEN NAVIGATIONOPTIONS this.ButtonDisbled', this.ButtonDisabled);
    // this.props.companyUpdate('ButtonDisabled', true);
     navigation.navigate('companyCreate', {ButtonDisabled})
  
}

class CompaniesScreen extends Component {
  componentWillMount() {
    this.props.fetchCompanies(this.props.fUserId)
    // console.log('COMPANIESSCREEN COMPONENTWILLMOUNT this.props', this.props);
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
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //   title: 'Companies',
  //   headerRight:
  //       <Button
  //         title= "+Business"
  //         onPress={()=>{navigation.navigate('companyCreate')}}
  //       />
  //       ,
  //       headerLeft: null
  //   }
   
  // }
  render() {
    // console.log('CompaniesScreen render  this.props.companies =', this.props.companies);
    const navigation = this.props.navigation
    return (
     <View>
        <Header 
          headerText={"Companies"} 
          leftButtonText={"+Business"}
          leftButtonStyle={
            {backGroundColor:'#8e44ad',
             color: '#bdc3c7'
            }
          }
        
        >
        </Header>
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
  const ButtonDisabled = false
  return {
    fUserId: state.auth.fUserId,
    companies,
    ButtonDisabled
  }
}

export default connect(mapStateToProps, actions)(CompaniesScreen);