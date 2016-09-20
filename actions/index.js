import Http from '../http';
import Store from '../store';
import {
  action
} from 'mobx';

export function getTopicList(params) {
  console.log('getTopicList');
  Http.getTopics(params)
    .then(action('on_topic_list_recieved',(data)=>{
      data.forEach((item)=>{
        Store[params.tab].push(item);
      })
    }) )
}