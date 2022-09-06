import { parse } from "query-string";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer"
import Header from "../Header"
import CreateToken from "./CreateToken"
import { SSO, Asset, AssetBalance, Account } from "ft3-lib";
import BlockchainContext from "../../../lib/blockchain/blockchain-context";
import connectWallet from "../../../img/Wallet-amico-blue.png";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";

const blockchainRID = process.env.REACT_APP_BLOCKCHAIN_RID;
const chainId = Buffer.from(
	blockchainRID,
	'hex'
);

const Main = () => {

	const { page, changeIsConnected } = useContext(AppContext)
	const blockchain = useContext(BlockchainContext);
	const { search } = useLocation()
	const [tx, setTx] = useState(search && parse(search).rawTx);
	const [account, setAccount] = useState(null);
	const verifyAndSendTx = async () => {
		if (!tx) {
			return
		}
		try {
			const sso = new SSO(blockchain);
			console.log("before finalize")
			const [account, user] = await sso.finalizeLogin(tx)
			console.log("after finalize")
			localStorage.setItem("chromia_account", account.id.toString("hex"))
			setAccount(account);
			changeIsConnected(true)
		} catch (e) {
			console.error('Login error', e)
			changeIsConnected(false);
		}
	}

	const createOrGetTokenId = async (tokenName) => {
		try {
			const existingToken = await Asset.getByName(tokenName, blockchain)
			if (existingToken.length === 0) {
				const newToken = await Asset.register(tokenName, chainId, blockchain)
				return newToken?.id
			}
			return existingToken[0].id
		} catch (e) {
			alert(JSON.stringify(e))
		}
	}

	const createTokenCallback = async (data) => {
		try {
			const tokenId = await createOrGetTokenId(data?.tokenName)
			console.log("Got token: ", tokenId)
			await AssetBalance.giveBalance(account.id, tokenId, parseFloat(data?.initialSupply), blockchain)
			return true
		} catch (e) {
			console.error(e)
			alert(JSON.stringify(e))
			return false
		}
	}

	const loadAccount = async (user, id) => {
		const loadedAccount = await blockchain.newSession(user).getAccountById(id)
		// const loadedAccount = new Account(storedAccount.id_.data, storedAccount.authDescriptor, storedAccount.tx.session)
		setAccount(loadedAccount)
		changeIsConnected(true)
	}
	useEffect(() => {
		let ft3_account = JSON.parse(localStorage.getItem('ft3_account'))
		const accountIdString = localStorage.getItem('chromia_account')
		if (ft3_account && accountIdString) {
			const storedAccount = Buffer.from(localStorage.getItem('chromia_account'), "hex")
			loadAccount(ft3_account.user, storedAccount)
		} else if (!account) {
			verifyAndSendTx()
		}
	}, []);

	let mainContent = null
	switch (page) {
		case "createToken":
			mainContent = <CreateToken callback={createTokenCallback} />
			break;
		case "swapToken":
			mainContent = <CreateToken callback={createTokenCallback} />
			break;
		case "addLiquidity":
			mainContent = <CreateToken callback={createTokenCallback} />
			break;
		default:
			break
	}
	return (
		<div className="hp-main-layout">
			<Header />
			{account ?
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