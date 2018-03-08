import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList
} from 'react-native'

class WatchFace extends Component {

  render () {
    return (
      <View style={styles.watchFaceContainer}>
        <View style={styles.watchFaceTimeWrapper}>
          <Text style={styles.sectionTime}>{this.props.sectionTime}</Text>
          <Text style={styles.totalTime}>{this.props.totalTime}</Text>
        </View>
      </View>
    )
  }
}

class WatchControl extends Component {

  constructor (props) {
    super(props)

    this.state = {
      watchOn: false,
      startBtnText: '启动',
      startBtnColor: '#60B644',
      stopBtnText: '计次',
      underlayColor: '#fff'
    }
  }

  startWatch () {
    if (!this.state.watchOn) {
      this.props.startWatch()
      this.setState({
        watchOn: true,
        startBtnText: '停止',
        startBtnColor: '#ff0044',
        stopBtnText: '计次',
        underlayColor: '#eee'
      })
    } else {
      this.props.stopWatch()
      this.setState({
        watchOn: false,
        startBtnText: '启动',
        startBtnColor: '#60B644',
        stopBtnText: '复位',
        underlayColor: '#eee'
      })
    }
  }

  addRecord () {
    if (this.state.watchOn) {
      this.props.addRecord()
    } else {
      this.props.clearRecord()
      this.setState({
        stopBtnText: '计次'
      })
    }
  }

  render () {
    return (
      <View style={styles.watchControlContainer}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableHighlight style={styles.btnStop} onPress={() => this.addRecord()} underlayColor={this.state.underlayColor}>
            <Text style={styles.btnStopText}>{this.state.stopBtnText}</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableHighlight style={styles.btnStart} onPress={() => this.startWatch()} underlayColor='#eee'>
            <Text style={[styles.btnStartText, {color: this.state.startBtnColor}]}>{this.state.startBtnText}</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

function WatchRecord (props) {

  let renderItem = ({item}) => {
    return (
      <View style={styles.recordItem}>
        <Text style={styles.recordItemTitle}>{item.title}</Text>
        <Text style={styles.recordItemTime}>{item.time}</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={props.records}
      renderItem={renderItem}
    />
  )
}

export default class extends Component {

  static navigationOptions = {
    title: 'A stopwatch'
  }

  constructor (props) {
    super(props)

    this.state = {
      stopWatch: false,
      resetWatch: true,
      intialTime: 0,
      currentTime: 0,
      recordTime: 0,
      timeAccumulation: 0,
      totalTime: "00:00.00",
      sectionTime: "00:00.00",
      recordCounter: 0,
      records: [
        {title: "", time: ""},
        {title: "", time: ""},
        {title: "", time: ""},
        {title: "", time: ""},
        {title: "", time: ""},
        {title: "", time: ""},
        {title: "", time: ""},
      ]
    }
  }

  startWatch () {

    if (this.state.resetWatch) {
      this.setState({
        stopWatch: false,
        resetWatch: false,
        timeAccumulation: 0,
        initialTime: Date.now()
      })
    } else {
      this.setState({
        stopWatch: false,
        initialTime: Date.now()
      })
    }

    let milSecond,
      second,
      minute,
      countingTime,
      secmilSecond,
      secsecond,
      secminute,
      seccountingTime

    let interval = setInterval(() => {

      this.setState({
        currentTime: Date.now()
      })

      countingTime = this.state.timeAccumulation + this.state.currentTime - this.state.initialTime

      minute = Math.floor(countingTime / (60 * 1000))
      second = Math.floor((countingTime - 60000 * minute) / 1000)
      milSecond = Math.floor((countingTime % 1000) / 10)

      seccountingTime = countingTime - this.state.recordTime
      secminute = Math.floor(seccountingTime / (60 * 1000))
      secsecond = Math.floor((seccountingTime - 60000 * secminute) / 1000)
      secmilSecond = Math.floor((seccountingTime % 1000) / 10)

      this.setState({
        totalTime: `${minute < 10 ? '0' + minute : minute }:${second < 10 ? '0' + second : second}.${milSecond < 10 ? '0' + milSecond : milSecond}`,
        sectionTime: (secminute<10? "0"+secminute:secminute)+":"+(secsecond<10? "0"+secsecond:secsecond)+"."+(secmilSecond<10? "0"+secmilSecond:secmilSecond),
      })

      if (this.state.stopWatch) {
        this.setState({
          timeAccumulation: countingTime
        })
        clearInterval(interval)
      }

    }, 10)
  }

  stopWatch () {
    this.setState({stopWatch: true})
  }

  addRecord () {

    let {recordCounter, records} = this.state
    recordCounter++

    if (recordCounter < 8) {
      records.pop()
    }

    records.unshift({title: '计次' + recordCounter, time:this.state.sectionTime})

    console.log(records)

    this.setState({
      recordTime: this.state.timeAccumulation + this.state.currentTime - this.state.initialTime,
      recordCounter: recordCounter,
      records: [...records]
    })
  }

  clearRecord () {
    this.setState({
      stopWatch: false,
      resetWatch: true,
      intialTime: 0,
      currentTime:0,
      recordTime:0,
      timeAccumulation:0,
      totalTime: "00:00.00",
      sectionTime: "00:00.00",
      recordCounter: 0,
      records:[
        {title:"",time:""},
        {title:"",time:""},
        {title:"",time:""},
        {title:"",time:""},
        {title:"",time:""},
        {title:"",time:""},
        {title:"",time:""}
      ],
     })
  }

  render () {
    return (
      <View>
        <WatchFace totalTime={this.state.totalTime} sectionTime={this.state.sectionTime}/>
        <WatchControl clearRecord={() => this.clearRecord()} addRecord={() => this.addRecord()} startWatch={() => this.startWatch()} stopWatch={() => this.stopWatch()}/>
        <WatchRecord records={this.state.records}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  watchFaceContainer: {
    backgroundColor: '#fff'
  },
  watchFaceTimeWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 5
  },
  sectionTime: {
    textAlign: 'right',
    fontSize: 20,
    fontWeight: '100',
    color: '#555',
  },
  totalTime: {
    fontSize: 65,
    fontWeight: '100',
    textAlign: 'right',
    color: '#222',
  },
  watchControlContainer: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 60,
    paddingRight: 60,
    backgroundColor: '#f3f3f3'
  },
  btnStop: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnStart: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnStopText: {
    fontSize: 14,
    color: '#555',
    backgroundColor: 'transparent'
  },
  btnStartText: {
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  recordItemTitle: {
    textAlign: 'left',
    paddingLeft: 20,
    color: '#777'
  },
  recordItemTime: {
    flex: 1,
    paddingRight:20,
    textAlign: 'right',
    color:"#222"
  }
})
