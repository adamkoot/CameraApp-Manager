import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";
import Screen3 from "./components/Screen3";
import CameraItem from "./components/CameraItem"; //to jest u mnie 4
import Screen5 from "./components/Screen5";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="s1"
          component={Screen1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="s2"
          component={Screen2}
          options={{
            title: "Zdjecia z folderu DCIM",
            headerStyle: {
              backgroundColor: "#ff0000",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="s3"
          component={Screen3}
          options={{
            title: "Wybrane zdjecie",
            headerStyle: {
              backgroundColor: "#ff0000",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="s4"
          component={CameraItem}
          options={{
            title: "Kamera",
            headerStyle: {
              backgroundColor: "#ff0000",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="s5"
          component={Screen5}
          options={{
            title: "Ustawienia",
            headerStyle: {
              backgroundColor: "#ff0000",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
