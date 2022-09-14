import { useContext } from "react";
import BlockchainContext from "../../../../lib/blockchain/blockchain-context";
import { SSO, User } from 'ft3-lib';
import { setStoredAccount } from '../../../../lib/account-storage';
import { AppContext } from "../../../context/AppContext";

const ConnectWallet = () => {
	const blockchain = useContext(BlockchainContext)
	const { chromia_account } = useContext(AppContext)

	const login = () => {
		const successUrl = `${window.location.origin}`;
		const cancelUrl = `${window.location.origin}`;

		const user = User.generateSingleSigUser();
		setStoredAccount({ user });

		new SSO(blockchain).initiateLogin(successUrl, cancelUrl);
	}
	return (
		<button onClick={login} className="btn btn-ghost btn-primary" style={{ width: 'auto' }}>{chromia_account != null ? "Connected" : "Connect Wallet"}</button>
	)
}

export default ConnectWallet