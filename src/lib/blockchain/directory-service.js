import { DirectoryServiceBase, ChainConnectionInfo } from 'ft3-lib';

const chainList = [

  // Our local chain
  new ChainConnectionInfo(
    Buffer.from(
      process.env.REACT_APP_BLOCKCHAIN_RID,
      'hex'
    ),
    process.env.REACT_APP_NODE_ADDRESS,
  ),
];

export default class DirectoryService extends DirectoryServiceBase {
  constructor() {
    super(chainList);
  }
}