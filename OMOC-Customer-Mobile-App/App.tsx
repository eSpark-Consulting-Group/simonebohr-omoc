import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import AppNavigator from "./src/navigations/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Alert, LogBox, StatusBar, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { Store } from "./src/redux/Store";
import FlashMessage from "react-native-flash-message";
import { MenuProvider } from "react-native-popup-menu";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIP_PUBLIC_KEY } from "@env";

function App(): JSX.Element {
  useEffect(() => {
    // LogBox.ignoreAllLogs();
  }, []);

  return (
    <GestureHandlerRootView style={styles.appContainer}>
      <StripeProvider
        publishableKey={STRIP_PUBLIC_KEY}
        merchantIdentifier="merchant.identifier"
        urlScheme="your-url-scheme"
      >
        <MenuProvider>
          <Provider store={Store}>
            <StatusBar
              animated={true}
              backgroundColor="#61dafb"
              hidden={false}
              barStyle="dark-content"
            />
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
            <FlashMessage position="bottom" />
          </Provider>
        </MenuProvider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
const styles = StyleSheet.create({
  appContainer: { flex: 1 },
});
