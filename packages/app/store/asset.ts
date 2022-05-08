
import { observable, makeObservable, action } from 'mobx';
import { ChainCoin } from '../data/asset-list';
class AssetStore {

  assets: ChainCoin[] = [];

  constructor() {
    makeObservable(this, {
      assets: observable,
      addAsset: action,
      updateAsset: action,
      removeAsset: action
    })
  }

  addAsset(asset: ChainCoin) {
    const assets = [...this.assets]
    assets.push(asset)
    this.assets = assets
    return asset;
  }

  updateAsset(asset: ChainCoin, index: number) {
    const assets = [...this.assets]
    if (index > -1) {
      assets[index] = asset
      this.assets = assets;
    }
    return asset
  }

  removeAsset(asset: ChainCoin) {
    this.assets = this.assets.filter((i) => i.coingecko_id !== asset.coingecko_id || i.name !== asset.name)
    return asset
  }

}
export default AssetStore;