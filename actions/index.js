import Http from '../http';
import Store from '../store';
import {
  action
} from 'mobx';

export function getTopicList(params,nextPage) {
  Store[`${params.tab}Loading`].status = true;
  console.log(`${params.tab}Loading`)
  console.log(params);
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

