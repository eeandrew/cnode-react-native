import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ViewPagerAndroid,
  Platform
} from 'react-native';
import autobind from 'autobind-decorator'
import List from '../List';
import {
  getTopicList
} from '../../actions';
import DetailPage from '../../containers/DetailPage';
import Indicator from '../Indicator';

export default class ViewPager extends Component {
  constructor(props) {
    super(props);
    this.tabsNumber = 4;
    this.state = {
      currentPage:0
    };
    this.Scroller = (Platform.OS === 'ios') ? ScrollView : ViewPagerAndroid;
  }

  get window() {
    return Dimensions.get('window');
  }

  componentDidMount() {
    this.onPageChanged(0);
  }

  mapPageToTab(pageIndex) {
    pageIndex = parseInt(pageIndex);
    switch(pageIndex) {
      case 0:
      return 'all';
      case 1: 
      return 'good';
      case 2:
      return 'share';
      case 3:
      return 'ask';
      default:
      return 'all';
    }
  }

  @autobind
  onScroll(params) {
    const scrollerX = params.nativeEvent.contentOffset.x;
    const maxHScrollerOffset = this.window.width * (this.tabsNumber -1);
    const maxScroll = 70 * (this.tabsNumber -1);
    if(scrollerX >= 0 && scrollerX <= maxHScrollerOffset) {
      const percent = scrollerX / maxHScrollerOffset;
      this.setState({
        currentPage: Math.floor(scrollerX / this.window.width + 0.5)
      });
    }
  }

  @autobind
  onPageSelected(params) {
    console.log(params.nativeEvent.position);
    this.setState({
      currentPage: params.nativeEvent.position,
    });
    this.refs.indicator.updateOffset( params.nativeEvent.position * 70);
  }

  @autobind
  onPageChanged(pageIndex) {
    const {
      store 
    } = this.props;
    const tab = this.mapPageToTab(pageIndex);
    if(store[tab].length > 0) return;
    if(store[`${tab}Loading`].status) return;
    setTimeout(()=>{
      getTopicList({
        page:store[`${tab}Page`],
        tab:this.mapPageToTab(pageIndex),
        limit:10,
      },true)
    },300);
  }

  @autobind
  onPullUp(pageIndex) {
      const {
        store 
      } = this.props;
     const tab = this.mapPageToTab(pageIndex);
     if(store[`${tab}Loading`].status) return;
    getTopicList({
      page:store[`${tab}Page`],
      tab:this.mapPageToTab(pageIndex),
      limit:10,
    },true)
  }

  componentWillUpdate(nextProps, nextState) {
    const {
      currentPage
    } = this.state;
    const nextPage = nextState.currentPage;
    if(currentPage !== nextPage) {
      console.log('onPageChanged ' + nextPage);
      this.onPageChanged(nextPage);
    }
  }

  @autobind
  onRowPress(row) {
    const {
      store 
    } = this.props;
    store.navigator && store.navigator.push({
      name:'DetailComponent',
      component: DetailPage,
      params:{id: row.id}
    })
  }

  render() {
    const contentContainerStyle = {
      width: this.window.width * 4,
      flex:1,
      flexDirection:'row',
      backgroundColor:'#FFFFFF'
    };
    const scrollViewProps = {
      pagingEnabled:true,
      horizontal:true,
      scrollEnabled:true,
      contentContainerStyle,
      showsHorizontalScrollIndicator:false,
      showsVerticalScrollIndicator:false,
      onScroll:this.onScroll,
      scrollEventThrottle:200,
      onPageSelected: this.onPageSelected,
      style: (Platform.OS === 'ios') ? {} : styles.container,
    };
    const tabStyle = {
      width:this.window.width,
      flex:1,
      backgroundColor:'#EEE'
    };
    const {
      currentPage
    } = this.state;
    const {
      store
    } = this.props;
    const {
      Scroller 
    } = this;
    return (
      <View style={[styles.container]}>
        <View style={[styles.header]}>
          <View style={[styles.header]}>
            <TouchableWithoutFeedback ><View style={[styles.headerItem,styles.headerItemFirst]}><Text style={{color:currentPage === 0 ? '#80bd01' : '#bebebe'}}>全部</Text></View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback ><View style={[styles.headerItem]}><Text style={{color:currentPage === 1 ? '#80bd01' : '#bebebe'}}>精华</Text></View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback ><View style={[styles.headerItem]}><Text style={{color:currentPage === 2 ? '#80bd01' : '#bebebe'}}>分享</Text></View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback ><View style={[styles.headerItem,styles.headerItemLast]}><Text style={{color:currentPage === 3 ? '#80bd01' : '#bebebe'}}>问答</Text></View></TouchableWithoutFeedback>
            <Indicator ref="indicator"/>
           </View>
        </View>
        <Scroller {...scrollViewProps}>
          <View style={tabStyle} key={1}>
            <List items={store.all} onRowPress={this.onRowPress} onPullDown={this.onPageChanged.bind(this,0)} onPullUp={this.onPullUp.bind(this,0)} isPullLoading={store.allLoading}/>
          </View>
          <View style={tabStyle} key={2}>
            <List items={store.good} onRowPress={this.onRowPress}  onPullDown={this.onPageChanged.bind(this,1)} onPullUp={this.onPullUp.bind(this,1)} isPullLoading={store.goodLoading}/>
          </View>
          <View style={tabStyle} key={3}>
            <List items={store.share} onRowPress={this.onRowPress}  onPullDown={this.onPageChanged.bind(this,2)} onPullUp={this.onPullUp.bind(this,2)} isPullLoading={store.shareLoading}/>
          </View>
          <View style={tabStyle} key={4}>
            <List items={store.ask} onRowPress={this.onRowPress}  onPullDown={this.onPageChanged.bind(this,3)} onPullUp={this.onPullUp.bind(this,3)} isPullLoading={store.askLoading}/>
          </View>
        </Scroller>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  tabStyle: {

  },
  header: {
    flexDirection:'row',
    height:40,
    backgroundColor:'#FFF',
    borderBottomWidth:0.5,
    borderBottomColor:"#CCC",
    justifyContent:'center',
    position:'relative'
  },
  headerItem: {
    width:60,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
    marginRight:5,
  },
  headerItemFirst: {
    marginLeft:0
  },
  headerItemLast: {
    marginRight:0
  },
  indicator: {
    height:2,
    width:60,
    backgroundColor:'#80bd01',
    position:'absolute',
    bottom:0,
    left:0,
  }
});