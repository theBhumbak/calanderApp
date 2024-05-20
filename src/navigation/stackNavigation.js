import {createStackNavigator} from '@react-navigation/stack';
import {routeNames} from './routeNames';
import {routeScreens} from './routeScreens';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={routeNames.Drawer}>
      <Stack.Screen
        name={routeNames.Drawer}
        component={routeScreens.AppDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routeNames.AddTask}
        component={routeScreens.TaskDetail}
      />
    </Stack.Navigator>
  );
};
