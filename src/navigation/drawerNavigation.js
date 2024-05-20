import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaView, Text} from 'react-native';
import {Dashboard} from '../screens/dashboard';
import {routeNames} from './routeNames';
import {routeScreens} from './routeScreens';
import {CalendarToday} from '../assets/svg';
import {s} from 'react-native-size-matters';

const Home = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};
const Drawer = createDrawerNavigator();

export const AppDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName={routeNames.Days3}>
      <Drawer.Screen
        name={routeNames.Day}
        component={routeScreens.Dashboard}
        initialParams={{daysInView: 1}}
        options={{
          drawerLabel: 'Day',
          drawerIcon: ({color, size}) => (
            <CalendarToday height={s(24)} width={s(24)} />
          ),
        }}
      />
      <Drawer.Screen
        name={routeNames.Days3}
        options={{
          drawerLabel: '3 Days',
          drawerIcon: ({color, size}) => (
            <CalendarToday height={s(24)} width={s(24)} />
          ),
        }}
        component={routeScreens.Dashboard}
        initialParams={{daysInView: 3}}
      />
      <Drawer.Screen
        name={routeNames.Week}
        options={{
          drawerLabel: 'Week',
          drawerIcon: ({color, size}) => (
            <CalendarToday height={s(24)} width={s(24)} />
          ),
        }}
        component={routeScreens.Dashboard}
        initialParams={{daysInView: 7}}
      />
      <Drawer.Screen name={routeNames.Home} component={Home} />
    </Drawer.Navigator>
  );
};
