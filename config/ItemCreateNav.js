import { TabNavigator, NavigationActions } from 'react-navigation';
import ItemCreateHoursScreen from '../screens/ItemCreateHoursScreen';
import ItemCreateAmountScreen from '../screens/ItemCreateAmountScreen';



export default ItemCreateNav = TabNavigator (
  {
    itemCreateHoursScreen: { screen: ItemCreateHoursScreen, },
    itemCreateAmountScreen: { screen: ItemCreateAmountScreen, }
  },
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: '#3498dbff',
      inactiveTintColor: '#3498db81',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#3498db25',
      },
      headerBackTitle: null,
    }
  },
);
