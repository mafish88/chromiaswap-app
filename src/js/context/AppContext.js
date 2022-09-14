import { createContext, useReducer } from "react";
import { ADD_LIQUIDITY_PAGE, CREATE_TOKEN_PAGE, SWAP_TOKEN_PAGE } from "../utils/constants";

const initialState = {
	page: SWAP_TOKEN_PAGE,
	chromia_account: null
};

const actions = {
	CHANGE_PAGE: "CHANGE_PAGE",
	SET_ACCOUNT: "SET_ACCOUNT"
};


const reducer = (state, action) => {
	switch (action.type) {
		case actions.CHANGE_PAGE:
			return { ...state, page: action.pageId };
		case actions.SET_ACCOUNT:
			return { ...state, chromia_account: action.chromia_account };
		default:
			return state;
	}
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = {
		page: state.page,
		chromia_account: state.chromia_account,
		changePage: (pageId) => {
			dispatch({ type: actions.CHANGE_PAGE, pageId });
		},
		setAccount: (chromia_account) => {
			dispatch({ type: actions.SET_ACCOUNT, chromia_account });
		}
	};

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};
