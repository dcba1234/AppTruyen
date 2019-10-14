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
<<<<<<< HEAD
      
=======
>>>>>>> mobile
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
<<<<<<< HEAD
      listNovel: [
        {
          Id: 1, Name: 'Yêu thần kí',
          View: 10, Hot: true,
          ImgUrl: 'https://tienthanh217.000webhostapp.com/AppTruyen/yeu-than-ky.jpg',
          Type: 'Truyện kiếm hiệp',
          Author: 'Tiến Tiến',
          DateModify: '1/1/2001',
          Continue: false,
          chapNumber: 10
        },
        {
          Id: 2, Name: 'Tiếu ngạo',
          View: 10, Hot: true,
          ImgUrl: 'https://tienthanh217.000webhostapp.com/AppTruyen/yeu-than-ky.jpg',
          Type: 'Truyện kiếm hiệp',
          Author: 'Tiến Tiến',
          DateModify: '1/1/2001',
          Continue: false,
          chapNumber: 10
        },
        {
          Id: 3, Name: 'Võ lâm truyền kỳ',
          View: 10, Hot: false,
          ImgUrl: 'https://tienthanh217.000webhostapp.com/AppTruyen/yeu-than-ky.jpg',
          Type: 'Truyện kiếm hiệp',
          Author: 'Tiến Tiến',
          DateModify: '1/1/2001',
          Continue: true,
          chapNumber: 10
        },
      ],// Ví dụ về 1 sách
    }
=======
      listNovel: [] // cái này xem trong log để xem kiểu dữ liệu
    };

>>>>>>> mobile
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
<<<<<<< HEAD
    // eslint-disable-next-line
    this.setState({ isReady: true });
  }
  render() {
    const data = this.state ? this.state.listNovel : [];
    return (<>
      {/* <Slideshow 
      dataSource={[
        { url:'https://tienthanh217.000webhostapp.com/AppTruyen/yeu-than-ky.jpg' },
        { url:'https://tienthanh217.000webhostapp.com/AppTruyen/yeu-than-ky.jpg' },
        { url:'https://tienthanh217.000webhostapp.com/AppTruyen/yeu-than-ky.jpg' }
    ]}/> */}
      <View style={styles.welcomeContainer}>
        <Image
          source={
            __DEV__
              ? require('../assets/images/robot-dev.png')
              : require('../assets/images/robot-prod.png')
          }
          style={styles.welcomeImage}
        />
      </View>
    
      <Image
        style={{ width: 450, height: 200 }}
        source={{ uri: 'http://www.nhahocotton.org.vn/wp-content/uploads/2018/04/thu-kiem-truong-an.jpg'}}>
        
      </Image>

      <View>
        {/* <Text>
          {data.length}
        </Text> */}
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View>
          {data.map((item) =>    // cái này chắc k cần gt nhể =>>
            <View style={{flexDirection: "row"}}>
              
              <Image
                style={{ width: 200, height: 200, margin: 5 }}
                source={{ uri: item.ImgUrl}}></Image>
                <Text>
                {item.Name}
              </Text>
              
            </View>)}
        </View>
      </ScrollView>
=======

    let list = await NovelService.getAll();
    this.setState({ isReady: true, listNovel: list });
    console.log(list);
  }

  reLoad = async() => {
    this.setState({isReady:false})
    let list = await NovelService.getAll();
    this.setState({isReady:true,listNovel: list})
  }
>>>>>>> mobile

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
