import { parse } from "query-string";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer"
import Header from "../Header"
import CreateToken from "./CreateToken"
import { SSO } from "ft3-lib";
import BlockchainContext from "../../../lib/blockchain/blockchain-context";
import connectWallet from "../../../img/Wallet-amico-blue.png";
import { AppContext } from "../../context/AppContext";
import { ADD_LIQUIDITY_PAGE, CREATE_TOKEN_PAGE, SWAP_TOKEN_PAGE, TOKEN_LIST_PAGE } from "../../utils/constants";
import AddLiquidity from "./AddLiquidity";
import SwapToken from "./SwapToken";
import TokenListPage from "./TokenListPage";
import { setStoredAccount } from "../../../lib/account-storage";

const Main = () => {

	const { page, chromia_account, setAccount } = useContext(AppContext)
	const blockchain = useContext(BlockchainContext);
	const { search } = useLocation()
	const [tx, setTx] = useState(search && parse(search).rawTx);
	const [componentKey, setComponentKey] = useState(Date.now())
	const verifyAndSendTx = async () => {
		if (!tx) {
			return
		}
		try {
			const sso = new SSO(blockchain);
			console.log("before finalize")
			const [account, user] = await sso.finalizeLogin(tx)
			setStoredAccount({ user, account })
			console.log("after finalize")
			localStorage.setItem("chromia_account", account.id.toString("hex"))
			setAccount(account);
		} catch (e) {
			console.error('Login error', e)
		}
	}

	const loadAccount = async (user, id) => {
		const loadedAccount = await blockchain.newSession(user).getAccountById(id)
		// const loadedAccount = new Account(storedAccount.id_.data, storedAccount.authDescriptor, storedAccount.tx.session)
		setAccount(loadedAccount)
	}

	useEffect(() => {
		let ft3_account = JSON.parse(localStorage.getItem('ft3_account'))
		const accountIdString = localStorage.getItem('chromia_account')
		if (tx && !chromia_account) {
			verifyAndSendTx()
		} else if (ft3_account && accountIdString) {
			const storedAccount = Buffer.from(localStorage.getItem('chromia_account'), "hex")
			loadAccount(ft3_account.user, storedAccount)
		}
	}, []);

	let mainContent = null
	switch (page) {
		case CREATE_TOKEN_PAGE:
			mainContent = <CreateToken />
			break;
		case SWAP_TOKEN_PAGE:
			mainContent = <SwapToken />
			break;
		case ADD_LIQUIDITY_PAGE:
			mainContent = <AddLiquidity key={componentKey} setKey={setComponentKey} />
			break;
		case TOKEN_LIST_PAGE:
			mainContent = <TokenListPage />
		default:
			break
	}
	return (
		<div className="hp-main-layout">
			<Header />
			{chromia_account ?
				mainContent :
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

export default Main