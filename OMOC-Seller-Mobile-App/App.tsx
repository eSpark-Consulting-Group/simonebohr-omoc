import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AppNavigator from "./src/routes/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { extendTheme } from "native-base";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { Store } from "./src/redux/Store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { MenuProvider } from "react-native-popup-menu";

const newColorTheme = {
  brand: {
    900: "#5B8DF6",
    800: "#ffffff",
    700: "#cccccc",
  },
};
GoogleSignin.configure({
  offlineAccess: false,
  iosClientId:
    "176320927004-7ab69fb254mqc5jea9ou6sls9flasq9a.apps.googleusercontent.com",
  webClientId:
    "176320927004-3rle3m26qkh4p7j9spfmdtujsvqoqghd.apps.googleusercontent.com",
  scopes: ["profile", "email"],
});
const theme = extendTheme({
  colors: newColorTheme,
});

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <MenuProvider>
        <Provider store={Store}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </Provider>
      </MenuProvider>
      <FlashMessage position="bottom" />
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  rootView: { flex: 1 },
});

export default App;
