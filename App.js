import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import io from 'socket.io-client';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigation/stackNavigation';
import {useServerUrl} from './src/utils';
import Toast from 'react-native-toast-message';
// const TaskDetail = () => {
const showToast = data => {
  Toast.show({
    type: 'success',
    text1: 'Noti',
    text2: 'This is a toast message 👋',
  });
};
// };
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const SOCKET_SERVER_URL = useServerUrl;

  useEffect(() => {
    // Initialize the Socket.IO client
    const socket = io(SOCKET_SERVER_URL);
    // Listen for the 'receive_message' event
    socket.on('receive_message', data => {
      // showToast();
      console.log('Received cronTasks:', data);
    });

    // Clean up
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <StackNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
