import { createContext, useReducer } from "react";

const initialState = {
	page: "createToken",
	isConnected: false,
};

const actions = {
	CHANGE_PAGE: "CHANGE_PAGE",
	CHANGE_IS_CONNECTED: "CHANGE_IS_CONNECTED",
};


const reducer = (state, action) => {
	switch (action.type) {
		case actions.CHANGE_PAGE:
			return { ...state, page: action.pageId };
		case actions.CHANGE_IS_CONNECTED:
			return { ...state, isConnected: action.isConnected };
		default:
			return state;
	}
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = {
		page: state.page,
		isConnected: state.isConnected,
		changePage: (pageId) => {
			dispatch({ type: actions.CHANGE_PAGE, pageId });
		},
		changeIsConnected: (isConnected) => {
			dispatch({ type: actions.CHANGE_IS_CONNECTED, isConnected });
		}
	};

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};
