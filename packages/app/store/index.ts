import AssetStore from './asset-store'
import PoolStore from './pool-store'

export class RootStore {
    assetStore: AssetStore
    poolStore: PoolStore

    constructor() {
        this.assetStore = new AssetStore(this)
        this.poolStore = new PoolStore(this)
    }
}

export default new RootStore();