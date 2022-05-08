import { makeObservable, observable, action, computed } from "mobx"
import { RootStore } from ".";

export interface PoolData {
    id: string;
    token1: { name: string; imgSrc: string };
    token2: { name: string; imgSrc: string };
    poolLiquidity: number;
    apr: number;
    myLiquidity: number;
    myBoundedAmount: number;
    longestDaysUnbonding: boolean;
}

export default class PoolStore {
    rootStore: RootStore;
    poolsData: PoolData[] = [];
    poolTokenNames: string[] = [];

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            poolsData: observable,
            addPool: action,
            allTokens: computed,
        })
        this.rootStore = rootStore;
    }

    get allTokens() {
        return this.rootStore.assetStore.chain.assets.map(({ name, logo_URIs }) => ({
            name: name,
            imgSrc: logo_URIs.png,
        })).filter(v => this.poolTokenNames.indexOf(v.name) === -1);
    }

    set current(pool: PoolData) {
        this.poolTokenNames.push(pool.token1.name, pool.token2.name);
    }

    getShuffledArr(arr: any[]) {
        for (let i = arr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[rand]] = [arr[rand], arr[i]];
        }
        return arr;
    };

    addPool() {
        const poolOptionTokens = this.getShuffledArr([...this.allTokens]);
        const id = (this.poolsData.length + 1).toString()
        const randomPoolLiquidity = parseInt(
            this.getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                .toString()
                .replaceAll(",", "")
        );
        const randomMyLiquidity = parseInt(
            this.getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                .toString()
                .slice(0, 5)
                .replaceAll(",", "")
        );
        const randomAPR = (parseInt(
            this.getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                .toString()
                .slice(0, 7)
                .replaceAll(",", "")
        ) / 100)

        const pool: PoolData = {
            id,
            token1: poolOptionTokens[0],
            token2: poolOptionTokens[1],
            poolLiquidity: randomPoolLiquidity,
            apr: randomAPR,
            myLiquidity: randomMyLiquidity,
            myBoundedAmount: randomMyLiquidity,
            longestDaysUnbonding: Math.random() < 0.5,
        }
        this.poolsData.push(pool);
        this.current = pool;
    }
}