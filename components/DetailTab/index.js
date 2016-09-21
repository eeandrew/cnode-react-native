import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DetailTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      store
    } = this.props;
    return (
      <View style={[styles.container]}>
        <TouchableOpacity style={[styles.tabItem]}>
          <View style={[styles.tabItem]}>
            <Icon name="heart-o" size={25} color="#bebebe"/>
            <Text style={[styles.tabTxt]}>收藏</Text>
          </View>
        </TouchableOpacity>

         <View style={[styles.tabItem]}>
          <View style={[styles.tabItem]}>
            <Icon name="eye" size={25} color="#bebebe"/>
            <Text style={[styles.tabTxt]}>浏览({store.detail.visit_count})</Text>
          </View>
        </View>


        <TouchableOpacity style={[styles.tabItem]}>
          <View style={[styles.tabItem]}>
            <Icon name="comment-o" size={25} color="#bebebe"/>
            <Text style={[styles.tabTxt]}>回复({store.detail.reply_count})</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    height:50,
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'#FFF',
    borderTopWidth:0.5,
    borderTopColor:'#CCC',
    flexDirection:'row',
  },
  wrapper: {

  },
  tabItem: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
   tabTxt: {
    fontSize:11,
    color:'#bebebe'
  }
});