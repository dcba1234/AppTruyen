import * as WebBrowser from "expo-web-browser";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Button } from "@ant-design/react-native";
import { NovelDetailComp } from "./Component/NovelFull.js";
import { NovelPartialComp } from "./Component/NovelPartial.js";
import React from "react";
import { NovelService } from "./Service/NovelService.js";
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
const lodash = require('lodash')
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      listNovel: [] // cái này xem trong log để xem kiểu dữ liệu
    };
  }

  async componentDidMount() {
    await Font.loadAsync(
      "antoutline",
      require("../node_modules/@ant-design/icons-react-native/fonts/antoutline.ttf")
    );
    await Font.loadAsync(
      "antfill",
      require("../node_modules/@ant-design/icons-react-native/fonts/antfill.ttf")
    );

    let list = await NovelService.getAll();
    console.log(list);
    let json = require('./Local.json');
    if(list.length == 0 ) list = json 
    this.setState({ isReady: true, listNovel: list });
    
  }

  reLoad = async () => {
    this.setState({ isReady: false });
    let list = await NovelService.getAll();
    this.setState({ isReady: true, listNovel: list });
  };

  render() {
    const data = this.state ? this.state.listNovel : [];
    const dataHot = this.state.listNovel.filter(item => item.Hot === "1");
    return (
      <View style={{height:'100%'}}>
       
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
          <Text style={{ fontSize: 18 }}>Truyện hot khuyên đọc</Text>
          <View>
            <NovelDetailComp item={dataHot[0]} />
          </View>
          <View style={styles.hotlist}>
            {dataHot
              .slice(1, dataHot.length > 5 ? 5 : dataHot.length)
              .filter(item => item.Hot === "1")
              .map((
                item,
                index // cái này chắc k cần gt nhể =>>
              ) => (
                <NovelPartialComp key={index} item={item} />
              ))}
          </View>
          <Text style={{ fontSize: 21 ,fontWeight:'bold'}}>Nhiều người đọc</Text>
          {lodash.orderBy(data.map((item)=> {return {...item,Viewer:parseInt(item.Viewer)}}),'Viewer','desc').map((item,index)=> <NovelDetailComp key={index} item={item} />)}
        </ScrollView>
      </View>
    );
  }
}
