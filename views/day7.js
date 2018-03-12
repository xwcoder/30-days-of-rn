import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Image,
  PanResponder,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import util from './util'

class MoveableBall extends Component {

  constructor (props) {
    super(props)

    this.state = {
      color: 'rgba(255, 255, 255, .7)'
    }

    this.prevLeft = 0
    this.prevTop = 0
    this.maxTop = util.size.height - 150
    this.maxLeft = util.size.width - 98

    this.ballStyles = {
      style: {
        left: this.prevLeft,
        top: this.prevTop
      }
    }

    this.panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          color: 'rgba(255, 255, 255, 1)'
        })
      },

      onPanResponderMove: (evt, gestureState) => {
        let left = this.prevLeft + gestureState.dx
        let top = this.prevTop + gestureState.dy

        left = Math.max(0, left)
        left = Math.min(this.maxLeft, left)

        top = Math.max(0, top)
        top = Math.min(this.maxTop, top)

        this.ballStyles.style.left = left
        this.ballStyles.style.top = top

        this.updatePosition()
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {this.end(gestureState)},
      onPanResponderTerminate: (evt, gestureState) => {this.end(gestureState)},
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })
  }

  componentDidMount () {

    this.updatePosition()
  }

  render () {
    return (
      <View ref={ball => {this.ball = ball}} style={styles.moveableBall} {...this.panResponder.panHandlers}>
        <Icon name='ios-baseball' color={this.state.color} size={120}/>
      </View>
    )
  }

  updatePosition () {
    if (this.ball) {
      this.ball.setNativeProps(this.ballStyles)
    }
  }

  end (gestureState) {
    this.prevLeft = this.prevLeft + gestureState.dx
    this.prevTop = this.prevTop + gestureState.dy
    this.setState({
      color: 'rgba(255,255,255,.7)'
    })
  }
}

export default class extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={require('./img/agrass.png')}></Image>
        <MoveableBall/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    position: 'absolute',
    width: util.size.width,
    resizeMode: 'cover'
  },
  moveableBall: {
    position: 'absolute',
    left: 0,
    top: 0
  }
})
