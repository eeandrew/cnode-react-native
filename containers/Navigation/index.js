import React, {
  Component
} from 'react';
import {
  Navigator
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
    return <Com navigator={navigator}/>
  }

  configureScene(route) {
    return Navigator.SceneConfigs.VerticalDownSwipeJump;
  }

  render() {
    return (
      <Navigator initialRoute={{id: 'home', component:HomePage}} renderScene={this.renderScene.bind(this)}>
      </Navigator>
    );
  }
}