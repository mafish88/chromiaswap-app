import { parse } from "query-string";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer"
import Header from "../Header"
import CreateToken from "./CreateToken"
import { SSO, Asset, AssetBalance } from "ft3-lib";
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

	const { changeIsConnected } = useContext(AppContext)
	const blockchain = useContext(BlockchainContext);
	const { search } = useLocation()
	const [tx, setTx] = useState(search && parse(search).rawTx);
	const [account, setAccount] = useState(null);
	const [session, setSession] = useState(null);
	const [processing, setProcessing] = useState(true)
	const verifyAndSendTx = async () => {
		if (!tx) {
			setProcessing(false);
			return
		}
		try {
			const sso = new SSO(blockchain);
			console.log("before finalize")
			const [account, user] = await sso.finalizeLogin(tx)
			console.log("after finalize")
			setAccount(account);
			setSession(blockchain.newSession(user));
			changeIsConnected(true)
		} catch (e) {
			console.error('Login error', e)
			changeIsConnected(false);
		} finally {
			setProcessing(false);
		}
	}

	const createOrGetTokenId = async (tokenName) => {
		try {
			const existingToken = await Asset.getByName(tokenName, blockchain)
			if (existingToken.length === 0) {
				const newToken = await Asset.register(tokenName, chainId, blockchain)
				return newToken[0].id
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

	useEffect(() => {
		if (!account) {
			verifyAndSendTx()
		}
	}, []);

	return (
		<div className="hp-main-layout">
			<Header />

			{account ?
				<CreateToken callback={createTokenCallback} /> :
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