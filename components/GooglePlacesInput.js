import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import * as actions             from '../actions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


class GooglePlacesInput extends Component {
  
  render() {
    const { address } = this.props.company
    const { company } = this.props
    return (
      <GooglePlacesAutocomplete
        placeholder={ 'Search'}
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          company.address = data.description;
          this.props.companyUpdate( 'company', company );
          this.props.navigation.goBack(null);
       }}
        
        getDefaultValue={() => ''}
      
        query={{
          key: 'AIzaSyBWljFaxAI4nKp41Tihi3CnTpjsqiTY5Ik',
          language: 'en', // language of the results
          // types: 'address' // default: 'geocode'
        }}
        
        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food'
        }}

        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // predefinedPlaces={[homePlace, workPlace]}

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
        // renderRightButton={() => <Text>Custom text after the input</Text>}
      />
    );
  }
}

const mapStateToProps = (state) => {
  if (state.companies.company) {
    const address = state.companies.company.address || '';
    const company = state.companies.company
    return {address, company}
  }
  return state;
}

export default connect(mapStateToProps, actions )(GooglePlacesInput);
