import * as WebBrowser from "expo-web-browser";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Button, Switch, Icon } from "@ant-design/react-native";
import { NovelDetailComp } from "./Component/NovelFull.js";
import { NovelPartialComp } from "./Component/NovelPartial.js";
import React from "react";
import { NovelService } from "./Service/NovelService.js";
import { createStackNavigator } from "react-navigation-stack";
import { StackNavigator, createAppContainer } from "react-navigation";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  StatusBar
} from "react-native";
import styles from "../Css/HomeScreen";
import { MonoText } from "../components/StyledText";

const lodash = require("lodash");

export default class NovelDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      listChap: [] // cái này xem trong log để xem kiểu dữ liệu
    };
  }

  async componentDidMount() {
    this.reLoad();
  }

  reLoad = async () => {
    this.setState({ isReady: false }); // await NovelService.getAllChap()
    let listChap = [];
    const itemProps = this.props.navigation.getParam("Novel", "NO-ID");
    if (listChap.length === 0) {
      let json = require("./Local2.json");
      listChap = json.filter(item => item.Novelid === itemProps.Id);
    }
    this.setState({
      isReady: true,
      listChap: listChap.filter(item => item.Novelid === itemProps.Id)
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const currentItem = navigation.getParam("Novel", "NO-ID");
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={!this.state.isReady}
            onRefresh={() => {
              this.reLoad();
            }}
          />
        }
      >
        <View style={{ height: "100%" }}>
          <View
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              borderBottomColor: "#00000029",
              borderBottomWidth: 0.5
            }}
          >
            <Image
              style={{ width: "100%", height: 150, position: "absolute" }}
              resizeMode="cover"
              blurRadius={4}
              source={{ uri: currentItem.Image }}
            />
            <TouchableOpacity
              onPress={() => {
                navigate("Home");
              }}
            >
              <Icon
                name="arrow-left"
                size="md"
                style={{ marginTop: 25, marginLeft: 10 }}
                color="#fff"
              />
            </TouchableOpacity>
            <View style={styles.containerHeader}>
              <View style={styles.left}>
                <Image
                  style={{ width: 70, height: 100, borderRadius: 5 }}
                  source={{ uri: currentItem.Image }}
                ></Image>
              </View>
              <View style={styles.right}>
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                >
                  {currentItem.Name}
                </Text>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 13 }}
                >
                  {currentItem.Author}
                </Text>
                <View style={styles.statusBox}>
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "#2ae8bf",
                      fontSize: 12
                    }}
                  >
                    {currentItem.Continue === "1" ? "Đang ra" : "Full"}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ margin: 10, color: "#b3b3b3" }}>
              {currentItem.Summary}
            </Text>
          </View>

          <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="menu" size="md" color="#b3b3b3" />
              <Text> Mục lục</Text>
            </View>
            <View>
              {this.state.listChap.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.props.navigation.navigate("ChapDetail", {
                      Chap: item
                    });
                  }}
                >
                  <View style={{ marginBottom: 5, marginTop: 5 }}>
                    <Text>{`Chương ${item.Chap}: ${item.Name}`}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

NovelDetail.navigationOptions = {
  header: null
};
