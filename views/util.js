import {Dimensions} from 'react-native'

let {width, height} = Dimensions.get('window')

export default {
  size: {
    width,
    height
  }
}
