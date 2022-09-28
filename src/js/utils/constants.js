export const CREATE_TOKEN_PAGE = "createToken"
export const ADD_LIQUIDITY_PAGE = "addLiquidity"
export const SWAP_TOKEN_PAGE = "swapToken"
export const TOKEN_LIST_PAGE = "tokenList"

const blockchainRID = process.env.REACT_APP_BLOCKCHAIN_RID;
export const chainId = Buffer.from(
	blockchainRID,
	'hex'
);

export const DECIMAL_REGEX = /^\d{1,}(\.\d{0,4})?$/