import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import Route from './navigation/Route';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store/store';
import {StatusBar} from 'react-native';
import OrientationLocker from 'react-native-orientation-locker';
import Orientation from 'react-native-orientation-locker';

function App(): React.JSX.Element {

  useEffect(() => {
    // Lock the orientation to portrait initially
    Orientation.lockToPortrait();

    // Set a timeout to unlock orientation after 3 seconds (adjust as needed)
    const timeoutId = setTimeout(() => {
      Orientation.unlockAllOrientations(); // Allow switching to landscape mode
    }, 3000); // Timeout duration in milliseconds

    // Cleanup function
    return () => {
      clearTimeout(timeoutId); // Clear the timeout on component unmount
      Orientation.lockToPortrait(); // Optional: Lock back to portrait if the component unmounts
    };
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
