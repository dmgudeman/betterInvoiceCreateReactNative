//https://github.com/xiaocaibird/react-native-dynamic-picker
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker, DateTimePicker } from 'react-native-dynamic-picker';

export default class Example extends React.Component {
	componentDidMount(){
		this.refs['Picker'].showPicker(true);
		this.refs['DynamicPicker'].showPicker(true);
		this.refs['DateTimePicker'].showPicker(true);		
	}
    render() {
        return (
            <View style={styles.container}>
                <Picker ref='Picker' data={this.props.list} title='Picker' branchTitles={['Options']} />
                <Picker ref='DynamicPicker' isDynamic={true}  data={this.props.areaList} title='Pick Area' branchTitles={['Country', 'City', 'District']} />
                <DateTimePicker ref='DateTimePicker' title='Pick Date' type={DateTimePicker.type.date} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }
	})