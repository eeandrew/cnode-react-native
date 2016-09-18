/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ListView
} from 'react-native';
import TabLayout, {
  Tabs,
  Bars
} from './components/TabLayout';
import ViewPager from './components/ViewPager';

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const rows = [];
    for(let i=0;i<100;i++) {
      rows.push(`Item-${i}`);
    }
    this.state = {
      contentContainerStyle:null,
      tabStyle:null,
      dataSource:ds.cloneWithRows(rows)
    }
  }

  get window() {
    return Dimensions.get('window');
  }
  componentDidMount() {
    this.setState({
      contentContainerStyle:{
        width: this.window.width * 3,
        flex:1,
        flexDirection:'row',
        backgroundColor:'#CCCCCC'
      },
      tabStyle:{
        width:this.window.width,
        flex:1,
      },
    });
  }
  _onTabClick(index) {
    let width = this.window.width;
    this.refs.ScrollView.scrollTo({
      x:index * width,
      y:0,
      animated:false
    });
  }
  render() {
    let { 
      contentContainerStyle,
      tabStyle
    } = this.state;
    let scrollViewProps = {
      horizontal:true,
      scrollEnabled:false,
      style:[styles.scrollView],
      contentContainerStyle,
      showsHorizontalScrollIndicator:false,
      showsVerticalScrollIndicator:false
    };
    // return (
    //   <View style={[styles.container]}>
    //     <ScrollView {...scrollViewProps} ref="ScrollView">
    //       <View style={tabStyle}>
    //         <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <Text>{rowData}</Text>}></ListView>
    //       </View>
    //       <View style={tabStyle}>
    //         <Text>Tab Content2</Text>
    //       </View>
    //       <View style={tabStyle}>
    //         <Text>Tab Content3</Text>
    //       </View>
    //     </ScrollView>
    //     <View style={[styles.tabs]}>
    //       <TouchableOpacity style={[styles.tabItem]} onPress={this._onTabClick.bind(this,0)}>
    //         <View>
    //           <Text>Tab1</Text>
    //         </View>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={[styles.tabItem]} onPress={this._onTabClick.bind(this,1)}>
    //         <View>
    //           <Text>Tab2</Text>
    //         </View>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={[styles.tabItem]} onPress={this._onTabClick.bind(this,2)}>
    //         <View>
    //           <Text>Tab2</Text>
    //         </View>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // );
    return (
      <TabLayout>
        <Bars type="Bars">
        <View style={styles.tabItem}>
            <Text>Tab1</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Tab2</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Tab3</Text>
          </View>
        </Bars>
        <Tabs type="Tabs">
            <ViewPager/>
            <Text>Tab Content2</Text>
            <Text>Tab Content3</Text>
        </Tabs>
      </TabLayout>
    );
  }
}

// class AwesomeProject extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabs: {
    height:50,
    flex:1,
    flexDirection:'row',
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    borderTopWidth:1,
    borderTopColor:'#CCCCCC',
    backgroundColor:'#FFFFFF'
  },
  tabItem: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  scrollView: {

  },
  contentContainerStyle: {

  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
