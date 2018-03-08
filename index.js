import React, {Component} from 'react'
import {
  AppRegistry,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import {StackNavigator} from 'react-navigation'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFA from 'react-native-vector-icons/FontAwesome'

import util from './views/util'
import Day1 from './views/day1'

class Home extends Component {

  static navigationOptions = {
    title: '30 days of RN'
  }

  constructor (props) {

    super(props)

    this.state = {
      days: [{
        key: 0,
        title: "A stopwatch",
        isFA: false,
        icon: "ios-stopwatch",
        size: 48,
        color: "#ff856c",
        hideNav: false,
        route: 'Day1'
      },{
        key: 1,
        title:"A weather app",
        isFA: false,
        icon: "ios-partly-sunny",
        size:60,
        color:"#90bdc1",
        hideNav: true,
      },{
        key: 2,
        title:"twitter",
        isFA: true,
        icon: "contao",
        size:50,
        color:"#FF9A05",
        hideNav: false,
      },{
        key: 4,
        title: "find my location",
        isFA: false,
        icon: "md-pin",
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
        isFA: true,
        icon: "twitter-square",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:9,
        title:"Tumblr Menu",
        isFA: false,
        icon: "logo-tumblr",
        size:50,
        color:"#37465c",
        hideNav: true,
      },{
         key:10,
         title:"OpenGL",
         isFA: false,
         icon: "md-contrast",
         size:50,
         color:"#2F3600",
         hideNav: false,
       },{
        key:11,
        title:"charts",
        isFA: false,
        icon: "ios-stats",
        size:50,
        color:"#fd8f9d",
        hideNav: false,
      },{
        key:12,
        title:"tweet",
        isFA: false,
        icon: "md-chatboxes",
        size:50,
        color:"#83709d",
        hideNav: true,
      },{
        key:13,
        title:"tinder",
        isFA: true,
        icon: "fire",
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
        icon: "ios-unlock",
        size:50,
        color:"#32A69B",
        hideNav: true,
      },{
        key:16,
        title:"Fuzzy search",
        isFA: false,
        icon: "md-search",
        size:50,
        color:"#69B32A",
        hideNav: false,
      },{
        key:17,
        title:"Sortable",
        isFA: false,
        icon: "md-move",
        size:50,
        color:"#68231A",
        hideNav: true,
      },{
        key:18,
        title:"TouchID to unlock",
        isFA: false,
        icon: "ios-log-in",
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
        isFA: true,
        icon: "safari",
        size:50,
        color:"#23bfe7",
        hideNav: false,
      },{
        key:23,
        title:"Youtube scrollable tab",
        isFA: false,
        icon: "logo-youtube",
        size:50,
        color:"#e32524",
        hideNav: true,
      },{
        key:24,
        title:"custome in-app browser",
        isFA: false,
        icon: "ios-globe",
        size:50,
        color:"#00ab6b",
        hideNav: true,
      },{
        key:25,
        title:"swipe and switch",
        isFA: false,
        icon: "md-shuffle",
        size:50,
        color:"#893D54",
        hideNav: true,
      },{
        key:26,
        title:"iMessage Gradient",
        isFA: false,
        icon: "ios-chatbubbles",
        size:50,
        color:"#248ef5",
        hideNav: false,
      },{
        key:27,
        title:"iMessage image picker",
        isFA: false,
        icon: "md-images",
        size:50,
        color:"#f5248e",
        hideNav: true,
      },{
        key:28,
        title:"3d touch",
        isFA: false,
        icon: "ios-navigate",
        size:50,
        color:"#48f52e",
        hideNav: false,
      },{
        key:29,
        title:"Push Notifications",
        isFA: false,
        icon: "md-notifications",
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
      return (
        <TouchableHighlight onPress={() => this.navigate(`Day${index + 1}`)} key={elem.key} style={styles.touchBox}>
          <View style={styles.boxContainer}>
            {elem.isFA ? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon, {color: elem.color}]}/>
              : <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon, {color: elem.color}]}/>}
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
  Day1: {screen: Day1}
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
