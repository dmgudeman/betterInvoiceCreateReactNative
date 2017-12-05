import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import { View, Text, ListView, FlatList, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as actions from '../actions';
import ListItem from '../components/ListItem'
// import { Button } from '../components/common';

function goToCreateCompany(){
  
    // console.log('COMPANIESSCREEN NAVIGATIONOPTIONS this.ButtonDisbled', this.ButtonDisabled);
    // this.props.companyUpdate('ButtonDisabled', true);
     navigation.navigate('companyCreate', {ButtonDisabled})
  
}
const debounce =(func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

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
  // Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
debounce =(func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

  static navigationOptions = ({ navigation }) => {
    // let  myEfficientFn = debounce(function() {
    //   ()=>{navigation.navigate('companyCreate')}
    // }, 250);
    return {
    title: 'Companies',
    headerRight:
        <Button
          title= "+Business"
          // onPress={myEfficientFn}
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
  const ButtonDisabled = false
  return {
    fUserId: state.auth.fUserId,
    companies,
    ButtonDisabled
  }
}

export default connect(mapStateToProps, actions)(CompaniesScreen);