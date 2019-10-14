import * as WebBrowser from "expo-web-browser";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Button } from "@ant-design/react-native";
import { NovelDetailComp } from "./Component/NovelFull.js";
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
  RefreshControl
} from "react-native";
import styles from "../Css/HomeScreen";
import { MonoText } from "../components/StyledText";

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
    this.setState({ isReady: true, listNovel: list });
    console.log(list); 
  }

  reLoad = async() => {
    this.setState({isReady:false})
    let list = await NovelService.getAll();
    this.setState({isReady:true,listNovel: list})
  }

  render() {

    const data = this.state ? this.state.listNovel : [];
    return (
      <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={!this.state.isReady} onRefresh={()=> {this.reLoad()}} />
          }
        >
          <View>
            {data.map((  
              item,
              index // cái này chắc k cần gt nhể =>>
            ) => (
              <NovelDetailComp key={index} item={item} />
            ))}
          </View>
        </ScrollView>
      </>
    );
  }
}
