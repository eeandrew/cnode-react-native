import {
  observable,
  computed,
  autorun
} from 'mobx';

class Store {
  @observable all = [];
  @observable allLoading = {status:false};
  @observable allPage = 1;

  @observable good = [];
  @observable goodLoading = {status:false};
  @observable goodPage = 1;

  @observable share = [];
  @observable shareLoading = {status:false};
  @observable sharePage = 1;

  @observable ask = [];
  @observable askLoading = {status:false};
  @observable askPage = 1;

  @observable job = [];
  @observable jobLoading = {status:false};
  @observable jobPage = 1;

  navigator = null;

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