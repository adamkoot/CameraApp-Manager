import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default class FotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showFoto = (uri, id, name) => {
    console.log(name);
    return this.props.navigation.navigate("s3", {
      uri: uri,
      id: id,
      name: name,
      odswiez: this.props.refreshState,
    });
  };

  render() {
    //console.log(this.props.zaznaczony);
    if (this.props.zaznaczony == false) {
      return (
        <TouchableOpacity
          style={styles.kafelek}
          onPress={this.showFoto.bind(
            this,
            this.props.uri,
            this.props.id,
            this.props.name
          )}
          onLongPress={() => this.props.select(this.props.id)}
        >
          <Image
            style={[
              styles.kafelek,
              {
                width: this.props.width,
                height: this.props.height,
              },
            ]}
            source={{ uri: this.props.uri }}
          />
          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>{this.props.id}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.kafelek}
          onPress={this.showFoto.bind(this, this.props.uri, this.props.id)}
          onLongPress={() => this.props.select(this.props.id)}
        >
          <Image
            style={[
              styles.kafelek,
              {
                width: this.props.width,
                height: this.props.height,
              },
            ]}
            source={{ uri: this.props.uri }}
          />
          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "red" }}>{this.props.id}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}
const styles = StyleSheet.create({
  kafelek: {
    borderRadius: 10,
  },
});
