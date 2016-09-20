import {
  observable,
  computed,
  autorun
} from 'mobx';

class Store {
  @observable all = [];
  @observable good = [];
  @observable share = [];
  @observable ask = [];
  @observable job = [];

  static getInstance() {
    if(!this.instance) {
      this.instance = new Store();
    }
    return this.instance;
  }

  @computed get allCount() {
    console.log(this.all.length);
    return this.all.length;
  }

  addToAll(item) {
    this.all.push(item);
  } 
}


export default new Store();