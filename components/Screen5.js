import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Dialog from "react-native-dialog";
import * as SecureStore from "expo-secure-store";

export default class Screen5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPort: null,
      newIP: null,
      visable: false,
    };
  }

  handleCancel = () => {
    this.setState({
      visable: false,
    });
  };

  handleSave = async () => {
    await SecureStore.setItemAsync(
      "ICT",
      JSON.stringify([
        {
          ip: this.state.newIP,
          port: this.state.newPort,
        },
      ])
    );
    this.setState({
      visable: false,
    });

    console.log(this.state);

    // return this.props.navigation.navigate("s2");
  };

  openDialog = () => {
    this.setState({
      visable: true,
    });
  };

  componentDidMount = async () => {
    let adressData = JSON.parse(await SecureStore.getItemAsync("ICT"));
    this.setState({
      newIP: adressData[0].ip,
      newPort: adressData[0].port,
    });
  };

  backPrev = () => {
    return this.props.navigation.navigate("s2");
  };
  render() {
    let ip;
    let port;

    try {
      ip = this.state.ip;
      port = this.state.port;
    } catch {
      (ip = ""), (port = "");
    }
    return (
      <View>
        <Dialog.Container visible={this.state.visable}>
          <Dialog.Title>Zmiana ustawień</Dialog.Title>
          <Dialog.Description>
            <SafeAreaView>
              {/* <Text>Zmien IP:</Text>
              <TextInput
                onChangeText={(value) => this.saveIP(value)}
                style={styles.input}
                value={this.state.newIP}
                keyboardType="numeric"
                placeholder={this.state.data.ip}
              /> */}
              <Dialog.Input
                style={styles.input}
                onChangeText={(e) => this.setState({ newIP: e })}
              >
                {this.state.newIP}
              </Dialog.Input>
              <Dialog.Input
                style={styles.input}
                onChangeText={(e) => this.setState({ newPort: e })}
              >
                {this.state.newPort}
              </Dialog.Input>
            </SafeAreaView>
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Save" onPress={this.handleSave} />
        </Dialog.Container>

        <View style={styles.view}>
          <Text>Obecnie zapisane IP to:</Text>
          <Text>{this.state.newIP}</Text>

          <Text>Obecnie zapisany PORT to:</Text>
          <Text>{this.state.newPort}</Text>

          <TouchableOpacity onPress={this.openDialog}>
            <Text>Zmień dane</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.backPrev}>
            <Text>Powrót</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    textAlign: "center",
    height: 40,
    width: 200,
    margin: 12,
    padding: 10,
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
