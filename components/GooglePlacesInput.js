import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import * as actions             from '../actions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const x = '';
const pickedProp = ''
class GooglePlacesInput extends Component {

  componentWillMount() {
    const { address} = this.props.navigation.state.params;  
    if (typeof address === 'string'){
    this.props.companyUpdate('address', address);
    } else { this.props.companyUpdate('address', '')}
    console.log('GOOGLEPLACESINPUT COMPONENTWILLMOUNT this.props', this.props);
    }
  render() {
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
        console.log('IN GOOGLEPLACESINPUT', data.desciption, details);
        this.props.companyUpdate( 'address', data.description);
      }}
      
      getDefaultValue={() => ''}
    
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyBWljFaxAI4nKp41Tihi3CnTpjsqiTY5Ik',
        language: 'en', // language of the results
        types: 'address' // default: 'geocode'
      }}
      
      // styles={{
      //   textInputContainer: {
      //     width: '100%'
      //   },
      //   description: {
      //     fontWeight: 'bold'
      //   },
      //   predefinedPlacesDescription: {
      //     color: '#1faadb'
      //   }
      // }}
      
      // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      // currentLocationLabel="Current location"
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
  const address = state.companies.address || '';
  // console.log('MAPSTATETOPROPS x', x);
  return {address}
}

const mapDispatchToProps = (dispatch) => {
  const {companyUpdate} = actions;
  return bindActionCreators({companyUpdate}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(GooglePlacesInput);
