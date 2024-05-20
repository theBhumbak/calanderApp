/*
APIs
  Crud with symulated login
  socket.io for notification
  Redux Toolkit with persist
UI
  Add Task Screen
    Task from
      title
      description
      start date
      start time
      end date
      end time
      tag
      category
      color
  View Tasks PoPup
    edit action
    delete action
  
  TaskCalander
    add tasks at hour slab on touch
    scroll postion => 
      vertical for current time
      horizontal for current date
      Both for filtered events=>{hide rest}
      when filter enabled postion to earliest task
      event color and title support
      click on event card open the diplay event popup
    display all tasks - done
left side drawer menu =>
   View day, 3 day, week,
filter by tag, category, color

Notification page
    notification list
    onClick show event popup / screen
    and read or clear notification

*/
import 'react-native-gesture-handler';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useRef} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DateTimeGrid} from './src/components/dateTimeGrid';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import DynamicForm from './src/components/from';
import TaskFromScreen from './src/screens/Tasks/TaskFromScreen';
import {taskActions} from './src/store/slices/taskSlice';
import io from 'socket.io-client';

import {AppDrawer} from './src/navigation/drawerNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigation/stackNavigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const SOCKET_SERVER_URL = 'http://calander-server.onrender.com';
  useEffect(() => {
    // Initialize the Socket.IO client
    const socket = io(SOCKET_SERVER_URL);
    // Listen for the 'cronTasks' event
    socket.on('receive_message', data => {
      console.log('Received cronTasks:', data);
      setTasks(data);
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaView style={{...backgroundStyle, flex: 1}}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <StackNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
