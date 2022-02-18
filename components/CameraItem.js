import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { BackHandler } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default class CameraItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fotoUri: 0,
      show: "none",
      hasCameraPermission: null, // przydzielone uprawnienia do używania kamery
      type: Camera.Constants.Type.back, // typ kamery
    };
  }

  handleBackPress = () => {
    this.props.route.params.refreshState();
    //...
    //powrót do ekranu poprzedniego
    this.props.navigation.goBack();
    return true;
  };

  changeOrientation = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  makePhoto = async () => {
    if (this.camera) {
      let foto = await this.camera.takePictureAsync();
      let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
      this.setState({ fotoUri: foto.uri });
      // console.log(this.state.show);
      //this.props.route.params.refreshState();
      this.setState({ show: "flex" });
      // console.log(this.state.show);
      setTimeout(() => {
        this.setState({
          show: "none",
        });
      }, 4000);
      this.setState({
        show: "none",
      });
      console.log("state po zmianie" + this.state.show);
      //alert(JSON.stringify(asset, null, 4));
      //this.props.route.params.refreshState();

      console.log("ki");
    }
  };
  
  componentDidMount = async () => {
    let { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status == "granted" });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  };

  render() {
    const stajl = {
      see: this.state.show,
      justifyContent: "center",
      alignItems: "center",
    };

    const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
    if (hasCameraPermission == null) {
      return <View />;
    } else if (hasCameraPermission == false) {
      return <Text>brak dostępu do kamery</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={(ref) => {
              this.camera = ref; // Uwaga: referencja do kamery używana później
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View style={stajl}>
              <Image
                style={styles.miniPhoto}
                source={{ uri: this.state.fotoUri }}
              />
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={this.changeOrientation}>
                <Text style={styles.tekst}>Obróc kamere</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.makePhoto}>
                <Text style={styles.tekst}>Zrób Zdjecie</Text>
              </TouchableOpacity>
              
            </View>
          </Camera>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    fontSize: 40,
    flexDirection: "row",
    top: 300,
    justifyContent: "space-between",
  },
  tekst: {
    flex: 3,
    color: "white",
    textAlign: "center",
  },
  podglad: {
    display: "none",
  },
  miniPhoto: {
    width: 100,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
