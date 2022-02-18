import React, { Component } from "react";
import * as MediaLibrary from "expo-media-library";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";

export default class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    };
  }

  componentDidMount = async () => {
    this.setState({
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
    });

    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("brak uprawnień do czytania image-ów z galerii");
    }

    let adressData = await SecureStore.getItemAsync("ICT");
    if (!adressData) {
      await SecureStore.setItemAsync(
        "ICT",
        JSON.stringify([
          {
            ip: "192.168.1.106",
            port: "5000",
          },
        ])
      );
    }

    adressData = JSON.parse(await SecureStore.getItemAsync("ICT"));
  };
  render() {
    return (
      <TouchableOpacity
        style={[{ height: this.state.height, width: this.state.width }]}
        onPress={() => this.props.navigation.navigate("s2")}
      >
        <View style={styles.view}>
          <View style={styles.header}>
            <Text style={styles.header}>Photos App</Text>
          </View>
          <View>
            <Text style={styles.text}>show gallery pictures</Text>
            <Text style={styles.text}>delete photo from device</Text>
            <Text style={styles.text}>share photo</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    margin: 5,
    color: "white",
    fontSize: 15,
  },
  header: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
});
