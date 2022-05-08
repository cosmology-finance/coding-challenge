import React, { useState, useEffect } from "react";

import Pools from '../components/pools-list';
import store from "../store";

export default function Index() {
  return (<>
    <Pools store={store} />
  </>
  );
}
