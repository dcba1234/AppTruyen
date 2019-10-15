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
import NovelDetail from "./NovelDetail";
import {
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

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      listNovel: [] // cái này xem trong log để xem kiểu dữ liệu
    };
  }

  async componentDidMount() {
    //await NovelService.getAll()
    let list = [];
    console.log(list);
    let json = require("./Local.json");
    if (list.length == 0) list = json;
    this.setState({ isReady: true, listNovel: list });
  }

  reLoad = async () => {
    this.setState({ isReady: false });
    let list = await NovelService.getAll();
    this.setState({ isReady: true, listNovel: list });
  };

  render() {
    const { navigate } = this.props.navigation;
    const data = this.state ? this.state.listNovel : [];
    const dataHot = this.state.listNovel.filter(item => item.Hot === "1");
    const { navigation } = this.props;
    return (
      <>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
      <View style={{ height: "100%",marginTop:15 }}>
        
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={!this.state.isReady}
              onRefresh={() => {
                this.reLoad();
              }}
            />
          }
        >
          <View style={{ height: 40, width: "100%", flexDirection: "row" }}>
            <Icon name="read" size="lg" color="#2ae8bf" />
            <Text style={{ fontSize: 21, color: "#2ae8bf" }}> Tiểu thuyết</Text>
          </View>
          <Text style={{ fontSize: 18 }}>Truyện hot khuyên đọc</Text>
          <View>
            <NovelDetailComp
              onClick={() => {
                this.props.navigation.navigate("Details", {
                  Id: dataHot[0].Id,
                  Novel: dataHot[0]
                });
              }}
              item={dataHot[0]}
            />
          </View>
          <View style={styles.hotlist}>
            {dataHot
              .slice(1, dataHot.length > 5 ? 5 : dataHot.length)
              .filter(item => item.Hot === "1")
              .map((item, index) => (
                <NovelPartialComp
                  onClick={() => {
                    this.props.navigation.navigate("Details", {
                      Id: item.Id,
                      Novel: item
                    });
                  }}
                  key={index}
                  item={item}
                />
              ))}
          </View>
          <Text style={{ fontSize: 21, fontWeight: "bold" }}>
            Nhiều người đọc
          </Text>
          {lodash
            .orderBy(
              data.map(item => {
                return { ...item, Viewer: parseInt(item.Viewer) };
              }),
              "Viewer",
              "desc"
            )
            .map((item, index) => (
              <NovelDetailComp
                onClick={() => {
                  this.props.navigation.navigate("Details", {
                    Id: item.Id,
                    Novel: item
                  });
                }}
                key={index}
                item={item}
              />
            ))} 
        </ScrollView> 
      </View>
      </>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

export const RootStack = createStackNavigator({
  Home: HomeScreen
});
