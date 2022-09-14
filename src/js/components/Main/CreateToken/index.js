import TokenInfoForm from "./TokenInfoForm"
import TokenSteps from "./TokenSteps"
import { Asset, AssetBalance } from "ft3-lib";
import { chainId } from "../../../utils/constants";
import BlockchainContext from "../../../../lib/blockchain/blockchain-context";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const CreateToken = () => {
	const blockchain = useContext(BlockchainContext);
	const { chromia_account } = useContext(AppContext)


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
			await AssetBalance.giveBalance(chromia_account.id, tokenId, parseFloat(data?.initialSupply), blockchain)
			return true
		} catch (e) {
			console.error(e)
			alert(JSON.stringify(e))
			return false
		}
	}

	return (
		<div className="hp-main-layout-content">
			<div className="row mb-32 gy-32">
				<div className="col-12">
					<div className="row bg-black-0 hp-bg-color-dark-100 rounded pe-16 pe-sm-32 mx-0 create-token">
						{/* <TokenSteps /> */}
						<TokenInfoForm callback={createTokenCallback} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateToken