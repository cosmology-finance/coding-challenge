import AssetStore from './asset';
import PoolStore from './pool';

class RootStore {
  assetStore: AssetStore;
  poolStore: PoolStore;
  constructor() {
    this.assetStore = new AssetStore();
    this.poolStore = new PoolStore()
  }
}
export const store = new RootStore();