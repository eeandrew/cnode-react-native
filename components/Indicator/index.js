import React, {
  Component
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import autobind from 'autobind-decorator'

export default class Indicator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      left:0
    }
  }

  @autobind
  updateOffset(left) {
    this.setState({
      left
    });
  }

  render() {
    const offset = {
      left: this.state.left
    }
    return <View style={[styles.indicator,offset]}></View>
  }
}

const styles = StyleSheet.create({
  indicator: {
    height:2,
    width:60,
    backgroundColor:'#80bd01',
    position:'absolute',
    bottom:0,
    left:0,
  }
});