import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function navigationAware(ScreenComponent, routeName) {
  
    const mapStateToProps = state => ({
      routeName: state.navigation.route,
    });
  
    class NavigationAware extends Component {
  
      screenWillFocus = () => (
        this.props.routeName === routeName
      );
  
      render() {
      console.log('NavigationAware props', this.props)
        return (
          <ScreenComponent
            {...this.props}
            routeName={this.props.routeName}
            screenWillFocus={this.screenWillFocus}
          />
        );
      }
    }
  
    return connect(mapStateToProps)(NavigationAware);
  }

