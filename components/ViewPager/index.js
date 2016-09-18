import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from 'react-native';

export default class ViewPager extends Component {
  constructor(props) {
    super(props);
  }

  get window() {
    return Dimensions.get('window');
  }

  render() {
    const contentContainerStyle = {
      width: this.window.width * 4,
      flex:1,
      flexDirection:'row',
      backgroundColor:'#FFFFFF'
    };
    const scrollViewProps = {
      pagingEnabled:true,
      horizontal:true,
      scrollEnabled:true,
      contentContainerStyle,
      showsHorizontalScrollIndicator:false,
      showsVerticalScrollIndicator:false
    };
    const tabStyle = {
      width:this.window.width,
      flex:1,
      backgroundColor:'#FFF'
    };
    return (
      <View style={[styles.container]}>
        <ScrollView {...scrollViewProps}>
          <View style={tabStyle} key={1}><Text>1</Text></View>
          <View style={tabStyle} key={2}><Text>2</Text></View>
          <View style={tabStyle} key={3}><Text>3</Text></View>
          <View style={tabStyle} key={4}><Text>4</Text></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
});