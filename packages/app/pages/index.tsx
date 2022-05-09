import React, { useState, useEffect } from "react";

import Pools from '../components/pools-list';
import RootStore from "../store";

const rootStore = new RootStore()

export default function Index() {
  return (<>
    <Pools store={rootStore} />
  </>
  );
}
