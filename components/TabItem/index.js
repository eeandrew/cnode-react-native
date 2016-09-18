import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class TabItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      active,
      txt
    } = this.props;
    const activeStyle = active ? styles.active : {};
    return (
      <View style={[styles.tabItem]}>
        <Text style={[activeStyle]}>{txt}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabItem: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  active:{
    color:'#80bd01'
  }
});

TabItem.propTypes = {
  txt: PropTypes.string,
  active: PropTypes.bool
};

TabItem.defaultProps = {
  active: false
};