import { useContext } from "react";
import BlockchainContext from "../../../../lib/blockchain/blockchain-context";
import { SSO, User } from 'ft3-lib';
import { setStoredAccount } from '../../../../lib/account-storage';
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";

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

	// const logout = () => {
	// 	new SSO(blockchain).logout();

	// }
	const getMinifiedAddress = (address) => {
		return [address.slice(0, 7), "...", address.slice(address.length - 7)].join('')
	}
	return (
		<>
			{chromia_account != null ?
				<button onClick={() => {
					navigator.clipboard.writeText(chromia_account.id.toString('hex'))
					toast("Copied to clipboard")
				}} className="btn btn-ghost btn-primary" style={{ width: 'auto' }}>{getMinifiedAddress(chromia_account.id.toString('hex'))}</button> :
				<button onClick={login} className="btn btn-ghost btn-primary" style={{ width: 'auto' }}>Connect Wallet</button>
			}
		</>
	)
}

export default ConnectWallet