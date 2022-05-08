import React from "react";
import Pools from '../components/pools-list';
import { useLocalObservable, Observer } from "mobx-react-lite";
import { store } from "../store/root";

export default function Index() {

  const { poolStore, assetStore } = useLocalObservable(() => store);

  return (<>
    <Observer>
      {
        () => <Pools pools={poolStore.pools} assets={assetStore.assets} />
      }
    </Observer>
  </>
  );
}
