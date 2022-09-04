import { Blockchain } from 'ft3-lib';
import DirectoryService from './directory-service';

const blockchainRID = process.env.REACT_APP_BLOCKCHAIN_RID;
const chainId = Buffer.from(
  blockchainRID,
  'hex'
);


export default Blockchain.initialize(
  chainId,
  new DirectoryService()
);