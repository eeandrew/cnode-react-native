import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import autobind from 'autobind-decorator'

export default class TabItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active : false
    }
  }

  @autobind
  changeActiveStatus(isActive) {
    this.setState({
      active: isActive
    });
  }

  render() {
    const {
      txt,
      icon,
      activeColor,
      inactiveColor
    } = this.props;
    const {
      active
    } = this.state;
    return (
      <View style={[styles.tabItem]}>
        <Icon name={icon} size={25} color={active?activeColor:inactiveColor}/>
        <Text style={[styles.tabTxt,{color:active?activeColor:inactiveColor}]}>{txt}</Text>
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
  tabTxt: {
    fontSize:11
  }
});

TabItem.propTypes = {
  txt: PropTypes.string,
  icon: PropTypes.string,
  active: PropTypes.bool,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
};

TabItem.defaultProps = {
  active: false,
  icon:'home',
  activeColor:'#80bd01',
  inactiveColor: '#bebebe',
};