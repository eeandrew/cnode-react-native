import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet,
  Image,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import autobind from 'autobind-decorator'
import {observer} from "mobx-react/native";
import HTMLView from 'react-native-htmlview';

@observer
export default class List extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = {
      isRefreshing:false
    };
  }

  @autobind
  _onPullDown() {
    const {
      onPullDown
    } = this.props;
    onPullDown && onPullDown();
  }

  @autobind
  _onPullUp() {
    console.log('_onPullUp')
    const {
      onPullUp
    } = this.props;
    onPullUp && onPullUp();
  }

  renderRow(row) {
    let avatar = {
      uri: row.author.avatar_url
    }
    return (
        <View style={[styles.list]}>
          <View style={[styles.author]}>
            <Image source={avatar} style={styles.avatar}/>
            <View style={styles.author_info}>
              <Text style={styles.author_name}>{row.author.loginname}</Text>
              <Text style={styles.create_at}>{row.create_at}</Text>
            </View>
          </View>
          <Text style={styles.title}>{row.title}</Text>
          <HTMLView style={styles.content} value={row.content}></HTMLView>
        </View>
    );
  }

  render() {
    const {
      ds 
    } = this;
    const {
      items,
      isPullLoading,
    } = this.props;
    let _items = items.map((item) => {
      return {
        title: item.title,
        last_reply_at: item.last_reply_at,
        good: item.good,
        top: item.top,
        reply_count: item.reply_count,
        visit_count: item.visit_count,
        create_at: item.create_at,
        author: item.author,
        content: item.content,
        tab: item.tab,
        id: item.id,
        author_id: item.author_id
      }
    });
    console.log(isPullLoading.status)
    const dataSource = ds.cloneWithRows(_items);
    return (
      <View style={{flex:1}}>
        {_items.length <= 0 ? <ActivityIndicator size="large" animating={true} color="#80bd01"/> : <ListView 
          refreshControl={
            <RefreshControl
              refreshing={isPullLoading.status}
              onRefresh={this._onPullDown}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#FFF']}
              progressBackgroundColor="#80bd01"
            />
          } 
        dataSource={dataSource} 
        renderRow={this.renderRow}
        onEndReachedThreshold={5}
        onEndReached={this._onPullUp}
        >
        </ListView>}
      </View>
    );
  }
}

List.propTypes = {
  items: PropTypes.any,
  onPullDown: PropTypes.func,
  isPullLoading: PropTypes.any,
  onPullUp: PropTypes.func,
}

List.defaultProps = {
  isPullLoading: {
    status:false
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCC',
    borderTopWidth: 0.5,
    borderTopColor: '#CCC',
    padding:10,
    backgroundColor:'#FFF',
    maxHeight:200
  },
  title: {
    color:'#000',
    fontSize: 18
  },
  author: {
    flexDirection:'row',
    marginBottom:5
  },
  avatar: { 
    width:40,
    height:40,
    borderRadius:20,
    marginRight:10
  },
  author_name: {
    color:'#000',
    fontSize: 16
  },
  create_at: {
    fontSize: 12
  },
  content: {
    height:50
  },
});