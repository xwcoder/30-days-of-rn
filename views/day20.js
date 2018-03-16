import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import { BlurView } from 'react-native-blur'
import util from './util'

export default class extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bgImg} source={require('./img/desktop.png')} />
        <BlurView style={styles.bgBlur} blurType='dark' />
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
  }
})
