import React, { Component } from 'react-native';
import { Container, Content, Picker } from 'native-base';

​
export default class MyPicker4 extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: undefined,
            selected1: 'key1',
            results: {
                items: []
            }
        }
    }
    
    onValueChange (value) {
        this.setState({
            selected1 : value
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Picker
                        headerComponent={
                            <Header>
                              ≈>
                            </Header>
                        }
                        mode='dropdown'
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this)}>
                        <Picker.Item label='Cats' value='key0' />
                        <Picker.Item label='Dogs' value='key1' />
                        <Picker.Item label='Birds' value='key2' />
                        <Picker.Item label='Elephants' value='key3' />
                   </Picker>
                </Content>
            </Container>
        );
    }
}

    // render() {
    //   return (
    //     <View>
    //       <Text> In MyPicker4 </Text>
    //     </View>
    //   )
    // }


const styles = {
  container: {
    flex: 1,
    alignSelf: 'stretch',
    height: 70,

    // borderWidth: 1,
    // borderColor: '#007aff',

  },
  picker: {
    flex: 1,
    height: 20,
    width: 100,
  }
}