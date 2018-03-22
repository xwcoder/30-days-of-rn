import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  TextInput,
  LayoutAnimation,
  StyleSheet
} from 'react-native'
import { BlurView } from 'react-native-blur'
import Icon from 'react-native-vector-icons/Feather'
import util from './util'

class RemiderListItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: this.props.data.text
    }

    this.onPress = () => this.props.onClick(this.props.index)
    this.onEndEditing = () => {
      this.props.onEndEditing(this.props.index, this.state.text)
    }

    this.onChangeText = text => this.setState({text})
  }

  render() {
    let { data, theme } = this.props

    return (
      <View style={styles.listItemContainer}>
        <TouchableHighlight onPress={this.onPress} underlayColor='transparent' style={[styles.checkButton, {borderColor: data.selected ? theme : '#c6c6c6'}]}>
          <View style={data.selected ? [styles.checkButtonFill, {backgroundColor: theme}]: null}></View>
        </TouchableHighlight>
        <View style={styles.textContainer}>
          <TextInput
            style={{color: data.selected ? '#999' : '#333'}}
            value={this.state.text}
            onEndEditing={this.onEndEditing}
            onChangeText={this.onChangeText}
          />
        </View>
      </View>
    )
  }
}

class ReminderAddComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }

    this.onChangeText = text => this.setState({text})
    this.onPress = () => {
      if (this.state.text) {
        this.props.addItem(this.state.text)
        this.setState({text: ''})
      }
    }
  }

  render() {
    let { data } = this.props

    return (
      <View style={styles.listItemContainer}>
        <TouchableHighlight onPress={this.onPress} underlayColor='transparent' style={styles.addButton}>
          <Icon name='plus' size={22} color='#c6c6c6' />
        </TouchableHighlight>
        <View style={styles.textContainer}>
          <TextInput
            value={this.state.text}
            onChangeText={this.onChangeText}
          />
        </View>
      </View>
    )
  }
}

class ReminderList extends Component {

  static defaultProps = {
    list: []
  }

  constructor(props) {
    super(props)
  }

  render() {

    let { list, theme, onClick, onEndEditing, addItem } = this.props
    return (
      <FlatList
        alwaysBounceVertical={false}
        data={list}
        renderItem={({item, index}) => {
          return (
            <RemiderListItem onEndEditing={onEndEditing} onClick={onClick} data={item} index={index} theme={theme} />
          )
        }}
        ListFooterComponent={<ReminderAddComponent addItem={addItem} />}
      />
    )
  }
}

export class ReminderSheet extends Component {

  static defaultProps = {
    title: '提醒事项',
    theme: '#fe952b',
    list: []
  }

  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title,
      list: this.props.list,
      theme: this.props.theme
    }

    this.onClick = this.onClick.bind(this)
    this.onEndEditing = this.onEndEditing.bind(this)
    this.addItem = this.addItem.bind(this)

    this.layoutAnimationConfig = {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      }
    }
  }

  onClick(index) {

    let { list } = this.state
    let item = list[index]

    if (item) {
      item.selected = !item.selected
      LayoutAnimation.configureNext(this.layoutAnimationConfig)

      this.setState({
        list: [...list]
      })
    }
  }

  onEndEditing(index, text) {
    let { list } = this.state
    let item = list[index]

    if (item) {
      item.text = text
      this.setState({
        list: [...list]
      })
    }
  }

  addItem(text) {

    let { list } = this.state

    list.push({
      text,
      selected: false
    })

    this.setState({
      list
    })
  }

  render() {

    let { theme, list, title } = this.state

    let length = list.filter(item => !item.selected).length

    return (
      <View style={[styles.reminderSheet, this.props.sheetStyle]}>
        <Image style={styles.remiderSheetBg} source={require('./img/packed.png')} />
        <TouchableHighlight underlayColor='transparent' onPress={this.props.switchSheet}>
          <View style={styles.sheetTitleContainer}>
            <Text style={[styles.sheetTitle, {color: theme}]}>{title}</Text>
            <Text style={[styles.sheetTitle, {color: theme}]}>{length}</Text>
          </View>
        </TouchableHighlight>
        <View style={{flex: 1}}>
          <ReminderList addItem={this.addItem} onEndEditing={this.onEndEditing} onClick={this.onClick} list={list} theme={theme}/>
        </View>
      </View>
    )
  }
}

export default class extends Component {

  constructor(props) {
    super(props)

    this.listData = {
      title:"Development",
      theme:"#fe952b",
      list:[{
        selected: false,
        text:"day20",
      },{
        selected:false,
        text:"day21",
      },{
        selected:false,
        text:"day22",
      },{
        selected:false,
        text:"day23",
      },{
        selected:false,
        text:"day24",
      },
      {
        selected:false,
        text:"day25",
      },
      ],
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bgImg} source={require('./img/desktop.png')} />
        <BlurView style={styles.bgBlur} blurType='dark' />
        <ReminderSheet {...this.listData}/>
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
  reminderSheet: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: util.size.width,
    height: util.size.height - 65,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: .3,
    shadowRadius: 2,
    shadowOffset: {
      height: -1,
      width: 0
    },
  },
  remiderSheetBg: {
    position: 'absolute',
    width: util.size.width,
    height: util.size.height - 65,
    opacity: .5,
    resizeMode: 'contain',
    borderRadius: 10
  },
  sheetTitleContainer: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  sheetTitle: {
    fontSize: 28,
    fontWeight: '300',
    textShadowRadius: 1,
    textShadowColor: '#ccc',
    textShadowOffset: {
      width: 0,
      height: 1
    }
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    paddingLeft: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 45,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkButton: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#c6c6c6',
    borderRadius: 11,
    shadowColor: '#aaa',
    shadowOpacity: .3,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkButtonFill: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  addButton: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
