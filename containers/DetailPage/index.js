import React, {
  Component
} from 'react';
import {
    View,
    Text,
    BackAndroid,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {
  observer
} from "mobx-react/native";
import {
  getTopicDetail
} from '../../actions';

@observer
export default class DetailPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      navigator
    } = this.props;
    BackAndroid.addEventListener('hardwareBackPress', () => {
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    });
    const {
      params
    } = this.props;
    if(params && params.id) {
      setTimeout(()=>{
        getTopicDetail({
          id: params.id
        })
      },1000)
    }
  }

  render() {
    const {
      store 
    } = this.props;
    const avatar = {
      uri: store.detail.author.avatar_url
    };
    return (
      <View style={[styles.container]}>
        <View style={[styles.header]}>
          <Text style={[styles.title]}>{store.detail.title}</Text>
        </View>
        <ScrollView>
          <View style={[styles.meta]}>
            <Image source={avatar} style={styles.avatar}/>
            <Text style={[styles.author]}>{store.detail.author.loginname}</Text>
          </View>
          <HTMLView value={store.detail.content}></HTMLView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
  },
  header: {

  },
  title:{
    color:'#000',
    fontSize:20
  },
  meta:{
    flexDirection:'row',
    alignItems:'center'
  },
  avatar: { 
    width:40,
    height:40,
    borderRadius:20,
    marginRight:10
  },
  author: {

  }
});