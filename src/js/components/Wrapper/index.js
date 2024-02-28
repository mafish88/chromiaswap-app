import { parse } from "query-string";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer"
import Header from "../Header"
import { SSO } from "ft3-lib";
import BlockchainContext from "../../../lib/blockchain/blockchain-context";
import connectWallet from "../../../img/Wallet-amico-blue.png";
import { AppContext } from "../../context/AppContext";
import { ADD_LIQUIDITY_PAGE, chainId, CREATE_TOKEN_PAGE, ROUTES, SWAP_TOKEN_PAGE, TOKEN_LIST_PAGE } from "../../utils/constants";
import { setStoredAccount } from "../../../lib/account-storage";
import LoadingOverlay from "react-loading-overlay";
import { PuffLoader } from "react-spinners";
import CreateToken from "../CreateToken";
import SwapToken from "../SwapToken";
import AddLiquidity from "../AddLiquidity";
import TokenListPage from "../TokenListPage";

const Wrapper = ({ children }) => {
	const { page, chromia_account, setAccount, changePage, pageLoaded, is_page_loaded } = useContext(AppContext)
	const blockchain = useContext(BlockchainContext);
	const { pathname, search } = useLocation()
	// eslint-disable-next-line no-unused-vars
	const [tx, setTx] = useState(search && parse(search).rawTx);
	const navigate = useNavigate();
	const verifyAndSendTx = async () => {
		if (!tx) {
			return
		}
		try {
			const sso = new SSO(blockchain);
			const [account, user] = await sso.finalizeLogin(tx)
			setStoredAccount({ user, account })
			localStorage.setItem("chromia_account", account.id.toString("hex"))
			setAccountAndPageLoaded(account);
			navigate("/", { replace: true })
		} catch (e) {
			console.error('Login error', e)
		}
	}

	console.log("search", pathname)

	const loadAccount = async (user, id) => {
		const loadedAccount = await blockchain.newSession(user).getAccountById(id)
		// const loadedAccount = new Account(storedAccount.id_.data, storedAccount.authDescriptor, storedAccount.tx.session)
		setAccountAndPageLoaded(loadedAccount)
	}

	const updatePage = async () => {
		if (ROUTES.includes(pathname)) {
			changePage(pathname)
		} else {
			changePage(TOKEN_LIST_PAGE)
		}
	}

	const setAccountAndPageLoaded = (account) => {
		setAccount(account)
		pageLoaded(true)
	}
	useEffect(() => {
		let ft3_account = JSON.parse(localStorage.getItem('ft3_account'))
		const accountIdString = localStorage.getItem('chromia_account')
		if (tx && !chromia_account) {
			verifyAndSendTx()
		} else if (ft3_account && accountIdString) {
			const storedAccount = Buffer.from(localStorage.getItem('chromia_account'), "hex")
			loadAccount(ft3_account.user, storedAccount)
		} else {
			setAccountAndPageLoaded(null)
		}
		updatePage()
	}, []);

	 let mainContent = null
	 switch (page) {
		 	case CREATE_TOKEN_PAGE:
				mainContent = <CreateToken />
				break;
		 	case SWAP_TOKEN_PAGE:
		 		// eslint-disable-next-line no-undef
		 		mainContent = <SwapToken key={key} setKey={setKey} />
		 		break;
	case ADD_LIQUIDITY_PAGE:
		// eslint-disable-next-line no-undef
		mainContent = <AddLiquidity key={key} setKey={setKey} />
		break;
		 	case TOKEN_LIST_PAGE:
				mainContent = <TokenListPage />
		 		break;
	 	default:
	 		// eslint-disable-next-line no-unused-vars
	 		mainContent = <TokenListPage />
	 		break
	 }
	if (!is_page_loaded) {
		return (<LoadingOverlay
			className="hp-main-layout-content"
			active={true}
			spinner={<PuffLoader color={"#5bc8d3"} />} />)
	}
	return (
		<div className="hp-main-layout">
			<Header />
			{chromia_account ?
				children :
				<form className={"centered-form bg-black position-relative overflow-hidden vertical-center"} style={{ margin: 'auto' }}>
					<div className={"row text-center"}>
						<div className={"check_mark_img"}>
							<img src={connectWallet} alt="Connect Wallet" className={"img-fluid"} style={{ height: "450px" }} />
						</div>
						<div className={"title pt-1"}>
							<h3>Please Connect Wallet</h3>
						</div>
					</div>
				</form>
			}
			<Footer />

		</div>
	)
}

export default Wrapper