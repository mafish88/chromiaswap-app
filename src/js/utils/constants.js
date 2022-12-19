export const CREATE_TOKEN_PAGE = "/create"
export const ADD_LIQUIDITY_PAGE = "/liquidity"
export const SWAP_TOKEN_PAGE = "/swap"
export const TOKEN_LIST_PAGE = "/tokens"
export const TX_HISTORY_PAGE = "/transactions"

const blockchainRID = process.env.REACT_APP_BLOCKCHAIN_RID;
export const chainId = Buffer.from(
	blockchainRID,
	'hex'
);

export const DECIMAL_REGEX = /^\d{1,}(\.\d{0,18})?$/

export const ROUTES = [CREATE_TOKEN_PAGE, ADD_LIQUIDITY_PAGE, SWAP_TOKEN_PAGE, TOKEN_LIST_PAGE, TX_HISTORY_PAGE]