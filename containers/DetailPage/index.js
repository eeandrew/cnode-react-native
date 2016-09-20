import React, {
  Component
} from 'react';
import {
    View,
    Text,
    BackAndroid
} from 'react-native';

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
  }

  render() {
    return (
      <View>
        <Text>DetailPage</Text>
      </View>
    );
  }
}