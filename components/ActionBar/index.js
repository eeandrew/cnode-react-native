import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ActionBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.actionBar}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionBar: {
    height:40,
    backgroundColor:'#FFF',
    borderBottomWidth:0.5,
    borderBottomColor:"#CCC",
    justifyContent:'center'
  },
  title: {
    color:'#80bd01'
  }
});