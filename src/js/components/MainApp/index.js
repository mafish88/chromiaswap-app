import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddLiquidity from "../AddLiquidity";
import CreateToken from '../CreateToken';
import SwapToken from '../SwapToken';
import TokenListPage from '../TokenListPage';
import { ADD_LIQUIDITY_PAGE, CREATE_TOKEN_PAGE, SWAP_TOKEN_PAGE, TOKEN_LIST_PAGE } from '../../utils/constants';
import SideBar from '../SideBar';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import LoadingOverlay from "react-loading-overlay";
import { PuffLoader } from "react-spinners";

const MainApp = () => {
	const { is_page_loaded } = useContext(AppContext)

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<> <SideBar /> <TokenListPage /> </>} />
				<Route path={ADD_LIQUIDITY_PAGE} element={<> <SideBar /> <AddLiquidity /> </>} />
				<Route path={CREATE_TOKEN_PAGE} element={<> <SideBar /> <CreateToken /> </>} />
				<Route path={SWAP_TOKEN_PAGE} element={<> <SideBar /> <SwapToken /> </>} />
				<Route path={TOKEN_LIST_PAGE} element={<> <SideBar /> <TokenListPage /> </>} />
			</Routes>
		</BrowserRouter>
	)
}

export default MainApp 