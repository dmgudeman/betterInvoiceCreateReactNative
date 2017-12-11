import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { debounce } from 'underscore';
import { Button } from 'react-native-elements';
import Icon                     from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';

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
          onPress= {_.debounce(()=>navigation.navigate('companyCreate'), 1000,{'leading':true, 'trailing':true})}
        />
        ,
        headerLeft: null
    }
   
  }
  render() {
    // console.log('CompaniesScreen render  this.props.companies =', this.props.companies);
    const navigation = this.props.navigation
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  }
})

export default connect(mapStateToProps, actions)(CompaniesScreen);