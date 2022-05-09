import { RootStore } from ".";
import { ChainCoin, Chain, osmosis } from "../data/asset-list";

export default class AssetStore {
    rootStore: RootStore;
    chain: Chain = osmosis;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    addAsset(asset: ChainCoin) {
        if (this.chain.assets.filter(
            v => v.symbol === asset.symbol
        ).length === 0
        ) {
            this.chain.assets.push(asset);
        }
    }

    updateAsset(asset: ChainCoin) {
        this.chain.assets = this.chain.assets.map(v => {
            if (v.symbol === asset.symbol) {
                return asset;
            } else {
                return v;
            };
        });
    }

    removeAsset(asset: ChainCoin) {
        this.chain.assets = this.chain.assets.filter(
            v => v.symbol !== asset.symbol
        );
    }
}