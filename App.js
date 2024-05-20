import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client';
import {StackNavigator} from './src/navigation/stackNavigation';
import {useServerUrl} from './src/utils';
import Toast from 'react-native-toast-message';
const showToast = (event = {}) => {
  const {title = 'event', description = ''} = event;
  Toast.show({
    type: 'success',
    text1: 'Reminder for ' + title,
    text2: description,
  });
};
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
    socket.on('receive_message', (data = []) => {
      console.log('receive_message', data);
      if (data?.length) showToast(data[0]);
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
