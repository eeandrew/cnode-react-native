import Http from '../http';
import Store from '../store';
import {
  action
} from 'mobx';

export function getTopicList(params,nextPage) {
  Store[`${params.tab}Loading`].status = true;
  Http.getTopics(params)
    .then(action('on_topic_list_recieved',(data)=>{
      data.forEach((item)=>{
        Store[params.tab].push(item);
      });
      Store[`${params.tab}Loading`].status = false;
      if(nextPage) Store[`${params.tab}Page`] = Store[`${params.tab}Page`] + 1;
    }) )
    .catch(action('on_topic_list_error',(error) => {
      Store[`${params.tab}Loading`].status = false;
    }));
}

export function getTopicDetail(params) {
  Store.detailLoading = true;
  Http.getTopic(params)
    .then(action('on_topic_detail_recieved',(data)=>{
      console.log('on_topic_detail_recieved')
      Store.detail.id = data.id;
      Store.detail.author_id = data.author_id;
      Store.detail.content = data.content;
      Store.detail.title = data.title;
      Store.detail.author = data.author;
      Store.detail.visit_count = data.visit_count;
      Store.detail.reply_count = data.reply_count;
      Store.detail.is_collect = data.is_collect;
      Store.detailLoading = false;
    }))
    .catch(action('on_topic_detail_error'),(error)=>{
      Store.content = '';
      Store.title = '';
      Store.detailLoading = false;
    });
}