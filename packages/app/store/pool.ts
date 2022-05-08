
import { observable, makeObservable, action } from 'mobx';
import { ChainCoin } from '../data/asset-list';

interface PoolsData {
  id: string;
  token1: { name: string; imgSrc: string };
  token2: { name: string; imgSrc: string };
  poolLiquidity: number;
  apr: number;
  myLiquidity: number;
  myBoundedAmount: number;
  longestDaysUnbonding: boolean;
}

class PoolStore {

  pools: PoolsData[] = [];

  constructor() {
    makeObservable(this, {
      pools: observable,
      addPool: action
    })
  }

  addPool(asset1: ChainCoin, asset2: ChainCoin) {
    const getShuffledArr = (arr: any[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
      }
      return arr;
    };

    const getRandomId = () => {
      return parseInt((Math.random() * 1000).toString()).toString()
    }

    const getRandomPoolLiquidity = () => {
      return parseInt(
        getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
          .toString()
          .replace(/,/g, "")
      );
    };
    const getRandomMyLiquidity = () => {
      return parseInt(
        getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
          .toString()
          .slice(0, 5)
          .replace(/,/g, "")
      );
    };
    const getRandomAPR = () => {
      return (
        parseInt(
          getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .toString()
            .slice(0, 7)
            .replace(/,/g, "")
        ) / 100
      );
    }

    this.pools = [...this.pools, {
      id: getRandomId(),
      token1: { name: asset1.name, imgSrc: asset1.logo_URIs.png },
      token2: { name: asset2.name, imgSrc: asset2.logo_URIs.png },
      poolLiquidity: getRandomPoolLiquidity(),
      apr: getRandomAPR(),
      myLiquidity: getRandomMyLiquidity(),
      myBoundedAmount: getRandomMyLiquidity(),
      longestDaysUnbonding: Math.random() < 0.5,
    }]
    return;
  }


}
export default PoolStore;