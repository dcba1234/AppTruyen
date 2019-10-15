import React from "react";
import { ExpoLinksView } from "@expo/samples";
import { Button, Switch, Icon } from "@ant-design/react-native";
import { NovelDetailComp } from "./Component/NovelFull.js";
import { NovelPartialComp } from "./Component/NovelPartial.js";
import { NovelService } from "./Service/NovelService.js";
import * as Font from "expo-font";
const lodash = require("lodash");
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
export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      listNovel: [], // cái này xem trong log để xem kiểu dữ liệu
      listType: []
    };
  }
  async componentDidMount() {
    //await NovelService.getAll()
    this.reLoad();
  }
  reLoad = async () => {
    this.setState({ isReady: false });
    let listNovel = await NovelService.getAll();
    let json = require("./Local.json");
    if (listNovel.length == 0) listNovel = json;

    let listType = await NovelService.getAllType();
    let jsonType = require("./Local3.json");
    if (listType.length == 0) listType = jsonType;

    console.log(listType);
    this.setState({ isReady: true, listNovel, listType });
  };
  render() {
    return (
      <ScrollView
        style={styles.container}
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
          <Text style={{ fontSize: 21, color: "#2ae8bf" }}> Thể loại</Text>
        </View>
        <View>
          {this.state.listType.map((itemTL, indexTL) => (
            <View
              key={indexTL}
              style={{ borderBottomColor: "#00000029", borderBottomWidth: 0.5,paddingBottom:15 }}
            >
              <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
                {itemTL.Name}
              </Text>
              {lodash
                .orderBy(
                  this.state.listNovel
                    .map(item => {
                      return { ...item, Viewer: parseInt(item.Viewer) };
                    })
                    .filter(item =>
                      item.Type.toLowerCase().includes(
                        itemTL.Name.toLowerCase()
                      )
                    ),
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
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

LinksScreen.navigationOptions = {
  title: null,
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 17,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    marginTop: 35
  }
});
