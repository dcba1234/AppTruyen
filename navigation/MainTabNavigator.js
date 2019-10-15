import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {  Icon } from '@ant-design/react-native';
import TabBarIcon from '../components/TabBarIcon';
import {HomeScreen} from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NovelDetail from '../screens/NovelDetail'
import * as Font from "expo-font";
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
 Font.loadAsync(
  "antoutline",
  require("../node_modules/@ant-design/icons-react-native/fonts/antoutline.ttf")
);
 Font.loadAsync(
  "antfill",
  require("../node_modules/@ant-design/icons-react-native/fonts/antfill.ttf")
);
export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: NovelDetail,
  },
  config
);

const NovelDetailStack = createStackNavigator(
  {
    Home: NovelDetail,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={
    //     Platform.OS === 'ios'
    //       ? `ios-information-circle${focused ? '' : '-outline'}`
    //       : 'md-information-circle'
    //   }
    // />
    <Icon name="home" size="md" color="#2f95dc" />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    
    <Icon name="account-book" size="md" color="#2f95dc" />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,

});

tabNavigator.path = '';

export default tabNavigator;
