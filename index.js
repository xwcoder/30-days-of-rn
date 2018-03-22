import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import Swiper from 'react-native-swiper'
import Ionicon from 'react-native-vector-icons/Ionicons'
import IconFA from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import util from './views/util'
import Day1 from './views/day1'
import Day3 from './views/day3'
import Day7 from './views/day7'
import Day20 from './views/day20'
import Day21 from './views/day21'

console.disableYellowBox = true

const getIconComponent = type => {

  switch (type) {
    case 'ion':
      Icon = Ionicon
      break
    case 'fa':
      Icon = IconFA
      break
    case 'mci':
      Icon = MaterialCommunityIcons
      break
    default:
      Icon = Ionicon
  }

  return Icon
}

class Home extends Component {

  static navigationOptions = {
    title: '30 days of RN'
  }

  constructor (props) {

    super(props)

    this.state = {
      days:[{
        key:0,
        title:"A stopwatch",
        iconType: 'ion',
        icon: "ios-stopwatch",
        size: 48,
        color: "#ff856c",
        hideNav: false,
      },{
        key: 1,
        title: "A weather app",
        iconType: 'mci',
        icon: "weather-partlycloudy",
        size: 48,
        color: "#90bdc1",
        hideNav: true,
      },{
        key:2,
        title:"twitter",
        iconType: 'fa',
        icon: "twitter",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:3,
        title:"cocoapods",
        isFA: true,
        icon: "contao",
        size:50,
        color:"#FF9A05",
        hideNav: false,
      },{
        key:4,
        title:"find my location",
        isFA: false,
        icon: "ios-location",
        size:50,
        color:"#00D204",
        hideNav: false,
      },{
        key:5,
        title:"Spotify",
        isFA: true,
        icon: "spotify",
        size:50,
        color:"#777",
        hideNav: true,
      },{
        key:6,
        title:"Moveable Circle",
        isFA: false,
        icon: "ios-baseball",
        size:50,
        color:"#5e2a06",
        hideNav: true,
      },{
        key:7,
        title:"Swipe Left Menu",
        isFA: true,
        icon: "google",
        size:50,
        color:"#4285f4",
        hideNav: true,
      },{
        key:8,
        title:"Twitter Parallax View",
        isFA: false,
        icon: "social-twitter-outline",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:9,
        title:"Tumblr Menu",
        isFA: false,
        icon: "social-tumblr",
        size:50,
        color:"#37465c",
        hideNav: true,
      },{
        key:10,
        title:"OpenGL",
        isFA: false,
        icon: "contrast",
        size:50,
        color:"#2F3600",
        hideNav: false,
      },{
        key:11,
        title:"charts",
        isFA: false,
        icon: "stats-bars",
        size:50,
        color:"#fd8f9d",
        hideNav: false,
      },{
        key:12,
        title:"tweet",
        isFA: false,
        icon: "chatbox-working",
        size:50,
        color:"#83709d",
        hideNav: true,
      },{
        key:13,
        title:"tinder",
        isFA: false,
        icon: "fireball",
        size:50,
        color:"#ff6b6b",
        hideNav: true,
      },{
        key:14,
        title:"Time picker",
        isFA: false,
        icon: "ios-calendar-outline",
        size:50,
        color:"#ec240e",
        hideNav: false,
      },{
        key:15,
        title:"Gesture unlock",
        isFA: false,
        icon: "unlocked",
        size:50,
        color:"#32A69B",
        hideNav: true,
      },{
        key:16,
        title:"Fuzzy search",
        isFA: false,
        icon: "search",
        size:50,
        color:"#69B32A",
        hideNav: false,
      },{
        key:17,
        title:"Sortable",
        isFA: false,
        icon: "arrow-move",
        size:50,
        color:"#68231A",
        hideNav: true,
      },{
        key:18,
        title:"TouchID to unlock",
        isFA: false,
        icon: "log-in",
        size:50,
        color:"#fdbded",
        hideNav: true,
      },{
        key:19,
        title:"Single page Reminder",
        isFA: false,
        icon: "ios-list-outline",
        size:50,
        color:"#68d746",
        hideNav: true,
      },{
        key:20,
        title:"Multi page Reminder",
        isFA: false,
        icon: "ios-paper-outline",
        size:50,
        color:"#fe952b",
        hideNav: true,
      },{
        key:21,
        title:"Google Now",
        isFA: false,
        icon: "android-microphone",
        size:50,
        color:"#4285f4",
        hideNav: true,
      },{
        key:22,
        title:"Local WebView",
        isFA: true,
        icon: "safari",
        size:50,
        color:"#23bfe7",
        hideNav: false,
      },{
        key:23,
        title:"Youtube scrollable tab",
        isFA: false,
        icon: "social-youtube",
        size:50,
        color:"#e32524",
        hideNav: true,
      },{
        key:24,
        title:"custome in-app browser",
        isFA: false,
        icon: "ios-world",
        size:50,
        color:"#00ab6b",
        hideNav: true,
      },{
        key:25,
        title:"swipe and switch",
        isFA: false,
        icon: "shuffle",
        size:50,
        color:"#893D54",
        hideNav: true,
      },{
        key:26,
        title:"iMessage Gradient",
        isFA: false,
        icon: "ios-chatbubble",
        size:50,
        color:"#248ef5",
        hideNav: false,
      },{
        key:27,
        title:"iMessage image picker",
        isFA: false,
        icon: "images",
        size:50,
        color:"#f5248e",
        hideNav: true,
      },{
        key:28,
        title:"iMessage image picker",
        isFA: false,
        icon: "navicon-round",
        size:50,
        color:"#48f52e",
        hideNav: false,
      },{
        key:29,
        title:"Push Notifications",
        isFA: false,
        icon: "android-notifications",
        size:50,
        color:"#f27405",
        hideNav: false,
      }]
    }
  }

  navigate (routeName) {
    this.props.navigation.navigate(routeName)
  }

  render () {

    let ratio = 1500 / 588
    let swiperHeight = util.size.width / ratio

    let boxes = this.state.days.map((elem, index) => {

      let Icon = getIconComponent(elem.iconType)

      return (
        <TouchableHighlight onPress={() => this.navigate(`Day${index + 1}`)} key={elem.key} style={styles.touchBox}>
          <View style={styles.boxContainer}>
            <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon, {color: elem.color}]}/>
            <Text style={styles.boxText}>Day{index + 1}</Text>
          </View>
        </TouchableHighlight>
      )
    })

    return (
      <ScrollView>
        <Swiper height={swiperHeight}>
          <TouchableHighlight onPress={() => this.navigate('Day1')}>
            <View>
              <Image style={[styles.image, {height: swiperHeight}]} source={require('./views/img/day1.png')}/>
              <Text style={styles.slideText}>Day1: Timer</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.navigate('Day2')}>
            <View>
              <Image style={[styles.image, {height: swiperHeight}]} source={require('./views/img/day2.png')}/>
              <Text style={styles.slideText}>Day2: Weather</Text>
            </View>
          </TouchableHighlight>
        </Swiper>
        <View style={styles.touchBoxContainer}>{boxes}</View>
      </ScrollView>
    )
  }
}

const App = StackNavigator({
  Home: {screen: Home},
  Day1: {screen: Day1},
  Day3: {
    screen: Day3,
    navigationOptions: {
      header: null
    }
  },
  Day7: {screen: Day7},
  Day20: {
    screen: Day20,
    navigationOptions: {
      header: null
    }
  },
  Day21: {
    screen: Day21,
    navigationOptions: {
      header: null
    }
  }
}, {
  navigationOptions: {
    headerBackTitle: '返回'
  }
})

const styles = StyleSheet.create({
  image: {
    width: util.size.width
  },
  slideText: {
    position: 'absolute',
    bottom: 0,
    width: util.size.width,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, .5)'
  },
  touchBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc'
  },
  touchBox: {
    width: util.size.width / 3,
    height: util.size.width / 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor:"#ccc",
    backgroundColor: '#fff',
  },
  boxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxIcon: {
    top: -10
  },
  boxText: {
    position: 'absolute',
    bottom: 15
  }
})

AppRegistry.registerComponent('ThirtyDaysOfRN', () => App)
//AppRegistry.registerComponent('ThirtyDaysOfRN', () => Day21)
