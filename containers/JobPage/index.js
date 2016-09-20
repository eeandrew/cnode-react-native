import List from '../../components/List';
import ActionBar from '../../components/ActionBar';
import {
  getTopicList
} from '../../actions';
import Store from '../../store';
import React,{
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import autobind from 'autobind-decorator'

export default class JobPage extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  onPullUp() {
    const tab = 'job';
    if(Store.jobLoading.status) return;
    getTopicList({
      page:Store.jobPage,
      tab,
      limit:10,
    },true)
  }

  @autobind
  init() {
    const tab = 'job';
    if(Store.jobLoading.status) return;
    if(Store.job.length > 0) return;
    getTopicList({
      page:1,
      tab,
      limit:10,
    },false);
  }

  @autobind
  onPullDown() {
    const tab = 'job';
    if(Store.jobLoading.status) return;
    getTopicList({
      page:1,
      tab,
      limit:5,
    },false);
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionBar title="招聘"/>
        <List items={Store.job} onPullUp={this.onPullUp} onPullDown={this.onPullDown} isPullLoading={Store.jobLoading}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#eee'
  }
});