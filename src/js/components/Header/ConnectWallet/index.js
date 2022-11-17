import { useContext } from "react";
import BlockchainContext from "../../../../lib/blockchain/blockchain-context";
import { SSO, User } from 'ft3-lib';
import { deleteStoredAccount, setStoredAccount } from '../../../../lib/account-storage';
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ConnectWallet = () => {
	const blockchain = useContext(BlockchainContext)
	const { chromia_account } = useContext(AppContext)
	const { pathname } = useLocation()
	const navigate = useNavigate();

	const login = () => {
		const successUrl = `${window.location.origin}`;
		const cancelUrl = `${window.location.origin}`;

		const user = User.generateSingleSigUser();
		setStoredAccount({ user });

		new SSO(blockchain).initiateLogin(successUrl, cancelUrl);
	}

	const logout = async () => {
		await new SSO(blockchain).logout();
		deleteStoredAccount()
		navigate(0)
	}
	const getMinifiedAddress = (address) => {
		return [address.slice(0, 7), "...", address.slice(address.length - 7)].join('')
	}
	return (
		<>
			{chromia_account != null ?
				<span style={{ width: 'auto' }}>
					<button
						onClick={() => {
							navigator.clipboard.writeText(chromia_account.id.toString('hex'))
							toast("Copied to clipboard")
						}} className="btn btn-ghost btn-primary" style={{ width: 'auto' }}>
						<p style={{ margin: "0px 0.5rem 0px 0.25rem" }}>{getMinifiedAddress(chromia_account.id.toString('hex'))}</p>
						<span className="">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
						</span>
					</button>
					<button
						onClick={logout}
						className="btn py-1.5 px-3 font-medium relative text-white" style={{ marginLeft: '10px', background: '#ff0022', borderRadius: '10px' }}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
					</button>
				</span> :
				<button onClick={login} className="btn btn-ghost btn-primary" style={{ width: 'auto' }}>Connect Wallet</button>
			}
		</>
	)
}

export default ConnectWallet