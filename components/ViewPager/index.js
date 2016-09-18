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
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';

export default class ViewPager extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.tabsNumber = 4;
    this.state = {
      indicatorLeftOffset:0
    };
  }

  get window() {
    return Dimensions.get('window');
  }

  onScroll(params) {
    const scrollerX = params.nativeEvent.contentOffset.x;
    const maxHScrollerOffset = this.window.width * (this.tabsNumber -1);
    const maxScroll = 70 * (this.tabsNumber -1);
    if(scrollerX >= 0 && scrollerX <= maxHScrollerOffset) {
      const percent = scrollerX / maxHScrollerOffset;
      this.setState({
        indicatorLeftOffset: percent * maxScroll
      });
    }
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
      showsVerticalScrollIndicator:false,
      onScroll:this.onScroll
    };
    const tabStyle = {
      width:this.window.width,
      flex:1,
      backgroundColor:'#FFF'
    };
    const leftOffset = {
      left: this.state.indicatorLeftOffset
    };
    return (
      <View style={[styles.container]}>
        <View style={[styles.header]}>
          <View style={[styles.header]}>
            <TouchableWithoutFeedback ><View style={[styles.headerItem,styles.headerItemFirst]}><Text>全部</Text></View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback ><View style={[styles.headerItem,styles.headerItem]}><Text>精华</Text></View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback ><View style={[styles.headerItem,styles.headerItem]}><Text>分享</Text></View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback ><View style={[styles.headerItem,styles.headerItemLast]}><Text>问答</Text></View></TouchableWithoutFeedback>
            <View style={[styles.indicator,leftOffset]}>
            </View>
           </View>
        </View>
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
  },
  tabStyle: {

  },
  header: {
    flexDirection:'row',
    height:40,
    backgroundColor:'#FFF',
    borderBottomWidth:0.5,
    borderBottomColor:"#CCC",
    justifyContent:'center',
    position:'relative'
  },
  headerItem: {
    width:60,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
    marginRight:5,
  },
  headerItemFirst: {
    marginLeft:0
  },
  headerItemLast: {
    marginRight:0
  },
  indicator: {
    height:2,
    width:60,
    backgroundColor:'#80bd01',
    position:'absolute',
    bottom:0,
    left:0,
  }
});