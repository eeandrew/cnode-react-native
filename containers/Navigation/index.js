import React, {
  Component
} from 'react';
import {
  Navigator,
  BackAndroid
} from 'react-native';
import HomePage from '../HomePage';
import JobPage from '../JobPage';
import DetailPage from '../DetailPage';
import autobind from 'autobind-decorator';
import Store from '../../store';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    let Com = route.component;
    Store.navigator = navigator;
    return <Com navigator={navigator} params={route.params} store={Store}/>
  }

  configureScene(route) {
    return Navigator.SceneConfigs.VerticalDownSwipeJump;
  }

  render() {
    return (
      <Navigator initialRoute={{component:HomePage}} renderScene={this.renderScene.bind(this)}>
      </Navigator>
    );
  }
}