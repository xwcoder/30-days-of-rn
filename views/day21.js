import React, { Component } from 'react'
import {
  View,
  Image,
  LayoutAnimation,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import { BlurView } from 'react-native-blur'
import util from './util'
import { ReminderSheet } from './day20'

export default class extends Component {
  constructor() {
    super()
    this.listData = [{
      title: 'Scheduled',
      theme: '#979797',
      list: [],
    },{
      title: 'Movie',
      theme:'#cb7adf',
      list: [],
    },{
      title: 'Work',
      theme: '#f9005f',
      list: [],
    },{
      title: 'Home',
      theme: '#00a8f4',
      list: [],
    },{
      title: 'Reminder',
      theme: '#68d746',
      list: [],
    },{
      title: 'Development',
      theme: '#fe952b',
      list: [{
        selected: false,
        text: 'day20',
      },{
        selected: false,
        text: 'day21',
      },{
        selected: false,
        text: 'day22',
      },{
        selected: false,
        text: 'day23',
      },{
        selected: false,
        text: 'day24',
      },{
        selected: false,
        text: 'day25',
      }]
    }]

    this.layoutAnimationConfig = {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        springDamping: 0.5,
      },
    }

    this.state = {
      openIndex: 0,
      spread: true,
    }

    this.toggleSpread = this.toggleSpread.bind(this)
  }

  switchSheet(index) {
    let { spread, openIndex } = this.state

    LayoutAnimation.configureNext(this.layoutAnimationConfig)

    this.setState({
      spread: !spread,
      openIndex: index
    })
  }

  toggleSpread() {

    LayoutAnimation.configureNext(this.layoutAnimationConfig)
    this.setState({
      spread: !this.state.spread
    })
  }

  render() {

    let len = this.listData.length
    let sheets = this.listData.map((data, index) => {
      return (
        <ReminderSheet
          {...data}
          key={`sheet${index}`}
          switchSheet={() => this.switchSheet(index)}
          sheetStyle={this.state.spread ?
            {top: 20 + index * 65} :
            {top: this.state.openIndex == index ? 20 : util.size.height + 5 * index - 5 * len}
          }
        />
      )
    })

    return (
      <View style={styles.container}>
        <Image style={styles.bgImg} source={require('./img/desktop.png')} />
        <BlurView style={styles.bgBlur} blurType='dark' />
        {sheets}
        <TouchableHighlight underlayColor='transparent' style={styles.resetButton} onPress={this.toggleSpread}>
          <View></View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImg: {
    position: 'absolute',
    width: util.size.width,
    height: util.size.height
  },
  bgBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  resetButton: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: util.size.width,
    height: 30,
  }
})
