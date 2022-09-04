import React, { createContext, useEffect, useState } from "react";
import Blockchain from './blockchain';

const  BlockchainContext = createContext()

const BlockchainConsumer = BlockchainContext.Consumer

const BlockchainProvider = ({children}) => {
  const [blockchain, setBlockchain] = useState(null);

  useEffect(() => {
    async function getBlockchain() {
      const myBlockchain = await Blockchain;
      setBlockchain(myBlockchain)
    }
    getBlockchain()
  });
  
  return <>
    { blockchain && <BlockchainContext.Provider value={blockchain}>
        {children}
    </BlockchainContext.Provider>}
  </> 
}

export default BlockchainContext;
export {
  BlockchainProvider,
  BlockchainConsumer
} 