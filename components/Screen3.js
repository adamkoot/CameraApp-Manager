import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
export default class Screen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  udostepnij = () => {
    Sharing.shareAsync(this.props.route.params.uri);
  };

  usun = async () => {
    await MediaLibrary.deleteAssetsAsync([this.props.route.params.id])
      .then((data) => {
        console.log(data);
        // this.setState(data);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
    this.props.route.params.odswiez();
    this.props.navigation.goBack();

    console.log(this.props.route.params.id);
  };

  upload = async () => {
    let adressData = JSON.parse(await SecureStore.getItemAsync("ICT"));

    let ip = adressData[0].ip;
    let port = adressData[0].port;

    const data = new FormData();

    // data.append('data1', 'test1');

    data.append("photo", {
      uri: this.props.route.params.uri,
      type: "image/jpeg",
      name: this.props.route.params.name,
    });
    fetch("http://" + ip + ":" + port + "/upload", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    Alert.alert("Alert THC", "Upload na serwer!", [{ text: "OK" }]);
  };

  imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let adressData = JSON.parse(await SecureStore.getItemAsync("ICT"));

      let ip = adressData[0].ip;
      let port = adressData[0].port;
      const data = new FormData();

      console.log(result);
      data.append("photo", {
        uri: result.uri,
        type: "image/jpeg",
        name: "cokolwiek.jpeg",
      });
      console.log(this.state.data);
      
      try {
        fetch("http://" + ip + ":" + port + "/upload", {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });

        Alert.alert("Alert THC", "Upload na serwer edytowanego zdjecia!", [
          { text: "OK" },
        ]);
      } catch {
        Alert.alert("Alert THC", "Error!", [{ text: "OK" }]);
      }
    }
  };

  render() {
    console.log(this.props.route.params.uri);
    return (
      <View style={styles.view}>
        <Image
          style={[
            styles.kafelek,
            {
              width: "90%",
              height: "80%",
            },
          ]}
          source={{ uri: this.props.route.params.uri }}
        />
        <View style={styles.buttons}>
          <TouchableOpacity onPress={this.udostepnij}>
            <Text style={styles.tekst}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.usun}>
            <Text style={styles.tekst}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.upload}>
            <Text style={styles.tekst}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.imagePicker}>
            <Text style={styles.tekst}>ImagPicker</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  kafelek: {
    borderRadius: 10,
  },
  tekst: {
    margin: 20,
    fontSize: 15,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
  },
});
