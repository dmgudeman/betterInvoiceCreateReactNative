import { TabNavigator } from 'react-navigation';
import ItemEditHoursScreen from '../screens/ItemEdit/ItemEditHoursScreen';
import ItemEditAmountScreen from '../screens/ItemEdit/ItemEditAmountScreen';

export default ItemEditNav = TabNavigator (
  {
    itemEditHoursScreen: { screen: ItemEditHoursScreen, },
    itemEditAmountscreen: { screen: ItemEditAmountScreen, }
  },
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: '#3498dbff',
      inactiveTintColor: '#3498db81',
      activeBackgroundColor: '#3498db21',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#3498db25',
      },
      headerBackTitle: null
    }
  }
)