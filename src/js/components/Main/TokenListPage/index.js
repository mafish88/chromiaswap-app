import { useContext, useEffect, useState } from "react"
import BlockchainContext from "../../../../lib/blockchain/blockchain-context"
import { AppContext } from "../../../context/AppContext"
import { AssetBalance } from "ft3-lib";


const TokenListPage = () => {

	const { chromia_account } = useContext(AppContext)
	const blockchain = useContext(BlockchainContext);
	const [tokenList, setTokenList] = useState([])

	const loadTokenList = async () => {
		const tokenBalances = await AssetBalance.getByAccountId(chromia_account?.id, blockchain)
		setTokenList(tokenBalances)
	}

	useEffect(() => {
		if (chromia_account) {
			loadTokenList()
		}
	}, [chromia_account?.id])

	const tableRows = tokenList.map((token, index) => {
		return (
			<tr key={index}>
				<th scope="row"><span className="icon-star"></span></th>
				<td>{index + 1}</td>
				<td>
					<a href="#"><span className="icon-btc"><span className="path1"></span><span className="path2"></span></span>
						<span>{token?.asset?.name}</span>
					</a>
				</td>
				<td className="boild">{token?.amount}</td>
			</tr>
		)
	})
	return (
		<div className="hp-main-layout-content">
			<div className="row mb-32 gy-32">
				<div className="col-12">
					<div className="row bg-black-0 hp-bg-color-dark-100 rounded mx-0 create-token">
						<div className="rounded-lg p-5 pt-4 shadow-card dark:bg-light-dark xs:p-6 xs:pt-5">
							<section className="coin-list">
								<div className="container">
									<div className="row">
										<div className="col-md-12">
											<div className="coin-list__main">
												<div className="flat-tabs">
													<div className="content-tab">
														<div className="content-inner">
															<table className="table">
																<thead>
																	<tr>
																		<th scope="col"></th>
																		<th scope="col">#</th>
																		<th scope="col">Name</th>
																		<th scope="col">Total Tokens</th>
																	</tr>
																</thead>
																<tbody>
																	{tableRows}
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>)
}

export default TokenListPage