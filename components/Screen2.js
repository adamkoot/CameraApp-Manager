import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import FotoItem from "./FotoItem";
import { Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";

export default class Screen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      numColumns: 4,
      width: 100,
      height: 100,
      refresh: true,
      dataa: null,
    };
  }

  componentDidMount = async () => {
    let obj = await MediaLibrary.getAssetsAsync({
      first: 100, // ilość pobranych assetów
      mediaType: "photo", // typ pobieranych danych, photo jest domyślne
    });
    obj.assets.map((i) => {
      i.zaznaczony = false;
    });
    this.setState({
      data: obj.assets,
    });
  };

  changeView = () => {
    if (this.state.numColumns == 4) {
      this.setState({
        numColumns: 1,
        height: Dimensions.get("window").height / 5,
        width: Dimensions.get("window").width,
      });
    } else {
      this.setState({
        numColumns: 4,
        height: 100,
        width: 100,
      });
    }
  };

  refreshState = async () => {
    let obj = await MediaLibrary.getAssetsAsync({
      first: 100, // ilość pobranych assetów
      mediaType: "photo", // typ pobieranych danych, photo jest domyślne
    });

    obj.assets.map((i) => {
      i.zaznaczony = false;
    });

    this.setState({
      data: obj.assets,
    });
    //console.log(this.state.data);
    console.log("sie odswierzylo");
  };

  openCamera = () => {
    return this.props.navigation.navigate("s4", {
      refreshState: this.refreshState,
    });
  };

  select = (id) => {
    this.state.data.map((idek) => {
      if (id == idek.id) {
        //console.log("dupa");
        if (idek.zaznaczony == true) {
          idek.zaznaczony = false;
        } else if (idek.zaznaczony == false) {
          idek.zaznaczony = true;
        }
      }
    });

    this.setState({
      cos: 1,
    });

    //console.log(id);
    console.log(this.state.data);
  };

  deleteSelected = async () => {
    this.state.data.map(async (idek) => {
      if (idek.zaznaczony == true) {
        await MediaLibrary.deleteAssetsAsync([idek.id])
          .then((data) => {
            console.log(data);
            // this.setState(data);
          })
          .catch((error) => {
            console.log(error.message);
            alert(error.message);
          });
      }
    });
    return this.props.navigation.navigate("s1");
  };

  uploadSelected = () => {
    this.state.data.map(async (idek) => {
      if (idek.zaznaczony == true) {
        let adressData = JSON.parse(await SecureStore.getItemAsync("ICT"));

        let ip = adressData[0].ip;
        let port = adressData[0].port;

        const data = new FormData();

        // data.append('data1', 'test1');

        data.append("photo", {
          uri: idek.uri,
          type: "image/jpeg",
          name: idek.filename,
        });

        fetch("http://" + ip + ":" + port + "/upload", {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
      }
    });
    Alert.alert("Alert OCB", "Zaznaczone pliki zaaplaudowane!", [
      { text: "OK" },
    ]);
    return this.props.navigation.navigate("s1");
  };

  settings = () => {
    return this.props.navigation.navigate("s5");
  };

  render() {
    return (
      <View>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.griditem} onPress={this.changeView}>
            <Text style={styles.tekst}>Grid / List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.griditem} onPress={this.openCamera}>
            <Text style={styles.tekst}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.griditem}
            onPress={this.deleteSelected}
          >
            <Text style={styles.tekst}>Remove Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.griditem}
            onPress={this.uploadSelected}
          >
            <Text style={styles.tekst}>Upload Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.griditem} onPress={this.settings}>
            <Text style={styles.tekst}>Sets</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={this.state.numColumns}
          key={this.state.numColumns}
          data={this.state.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FotoItem
              width={this.state.width}
              height={this.state.height}
              uri={item.uri}
              name={item.filename}
              id={item.id}
              navigation={this.props.navigation}
              refreshState={this.refreshState}
              select={this.select}
              zaznaczony={item.zaznaczony}
            />
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tekst: {
    fontSize: 20,
    textAlign: "center",
  },
});
