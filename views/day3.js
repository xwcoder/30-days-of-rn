import React, {Component} from 'react'
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Text
} from 'react-native'

import {TabNavigator} from 'react-navigation';
import IconFA from 'react-native-vector-icons/FontAwesome'
import util from './util'

const AnimatedIcon = Animated.createAnimatedComponent(IconFA)

class Entrance extends Component {

  constructor (props) {
    super(props)

    this.state = {
      opacityAnim: new Animated.Value(1),
      scaleAnim: new Animated.Value(1)
    }
  }

  componentDidMount () {

    Animated.timing(this.state.opacityAnim, {
      toValue: 0,
      duration: 800,
      delay: 1e3,
      easing: Easing.elastic(1)
    }).start(() => {
      this.props.onEnd()
    })

    Animated.timing(this.state.scaleAnim, {
      toValue: 50,
      duration: 1500,
      delay: 1e3,
      easing: Easing.elastic(2)
    }).start()
  }

  render () {
    return (
      <Animated.View style={[styles.entrance, {opacity: this.state.opacityAnim}]}>
        <AnimatedIcon size={60} name='twitter' style={[styles.entranceIcon, {transform:[{scale: this.state.scaleAnim}]}]}/>
      </Animated.View>
    )
  }
}

class HomePage extends Component {

  render () {
    return (
      <View style={{width: 100, height: 100, backgroundColor: 'red'}}><Text>Home page</Text></View>
    )
  }
}

class ProfilePage extends Component {
  render () {
    return (
      <View><Text>ProfilePage</Text></View>
    )
  }
}

const TwitterApp = TabNavigator({
  TwitterHome: {screen: HomePage},
  Profile: {screen: ProfilePage}
}, {
  initialRouteName: 'TwitterHome'
})

export default class extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showEntrance: true
    }
  }

  hideEntrance () {
    this.setState({
      showEntrance: false
    })
  }

  render () {

    let entrance = this.state.showEntrance ? <Entrance onEnd={() => this.hideEntrance()}/> : null

    return (
      <View>
        <TwitterApp/>
        {entrance}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  entrance: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: util.size.width,
    height: util.size.height,
    backgroundColor: '#1b95e0'
  },
  entranceIcon: {
    position: 'relative',
    top: -40,
    color: '#fff',
  }
})
