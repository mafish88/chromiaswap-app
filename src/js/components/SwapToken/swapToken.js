import { useContext, useEffect, useState } from "react"
import BlockchainContext from "../../../lib/blockchain/blockchain-context"
import { AppContext } from "../../context/AppContext"
import CommonTokenSelector from "../CommonTokenSelector"
import { Asset, AssetBalance, nop, op } from "ft3-lib";
import TokenListModal from "../TokenListModal";
import { chainId, DECIMAL_REGEX, TOKEN_LIST_PAGE } from "../../utils/constants";
import { getStoredAccount } from "../../../lib/account-storage";
import { toast } from 'react-toastify';
import LoadingOverlay from "react-loading-overlay";
import { PuffLoader } from "react-spinners";
import { getTokenListForSwap } from "../../utils/helper";
import Wrapper from "../Wrapper";

const TOKENAMOUNT1 = "TOKENAMOUNT1";
const TOKENAMOUNT2 = "TOKENAMOUNT2";

const SwapTokenComponent = ({ setKey }) => {
	const [firstToken, setFirstToken] = useState(null)
	const [firstTokenAmount, setFirstTokenAmount] = useState("")
	const [secondToken, setSecondToken] = useState(null)
	const [secondTokenAmount, setSecondTokenAmount] = useState("")
	const [tokenListModalMode, setTokenListModalMode] = useState("hidden")
	const [tokenList, setTokenList] = useState({})
	const { chromia_account, changePage } = useContext(AppContext)
	const blockchain = useContext(BlockchainContext);
	const [slippageTolerance, setSlippageTolerance] = useState(0.1)
	const [rate, setRate] = useState()
	const [processing, setProcessing] = useState(false)
	const [pairId, setPairId] = useState("")

	const closeModal = () => {
		setTokenListModalMode('hidden')
	}

	const loadTokenList = async () => {
		const tokenBalances = await AssetBalance.getByAccountId(chromia_account?.id, blockchain)
		const pairList = await blockchain.query("ft3.get_pairs", {})
		setTokenList(getTokenListForSwap(tokenBalances, pairList))
	}

	const createOrGetTokenId = async (tokenName) => {
		try {
			const existingToken = await Asset.getByName(tokenName, blockchain)
			if (existingToken.length === 0) {
				const newToken = await Asset.register(tokenName, chainId, blockchain)
				return newToken?.id
			}
			return existingToken[0].id
		} catch (err) {
			console.log(JSON.stringify(err))
		}
	}
	const testMethod = async () => {
		const storedAccount = getStoredAccount()

		const newToken1 = await createOrGetTokenId("Token1")
		await AssetBalance.giveBalance(chromia_account.id, newToken1, 100100, blockchain)

		const newToken2 = await createOrGetTokenId("Token2")
		await AssetBalance.giveBalance(chromia_account.id, newToken2, 200200, blockchain)

		await blockchain.transactionBuilder()
			.add(op("ft3.add_liq", newToken1, newToken2, 100000, 200000, storedAccount.user.authDescriptor.id, chromia_account.id))
			.add(nop())
			.buildAndSign(storedAccount.user).post()
	}

	const reset = () => {
		setKey(Date.now())
	}
	const swapToken = async () => {
		setProcessing(true)
		try {
			const storedAccount = getStoredAccount()
			const amountOutMin = getMinReceived(secondTokenAmount, slippageTolerance)
			console.log(await blockchain.transactionBuilder()
				.add(op("ft3.swap", firstToken?.id, secondToken?.id, firstTokenAmount, amountOutMin.toString(), Date.now() + 10000, storedAccount.user.authDescriptor.id, chromia_account.id))
				.add(nop())
				.buildAndSign(storedAccount.user).post())
			toast(`Swapped succesfully`)
			changePage(TOKEN_LIST_PAGE)
			setKey(Date.now())
		} catch (err) {
			console.log(JSON.stringify(err))
			toast(err.shortReason)
		} finally {
			setProcessing(false)
		}
	}

	const getMinReceived = (amount, slippage) => {
		return parseFloat(amount) * ((100 - slippage) / 100)
	}
	const fetchPrice = async (first, second, amount, setter) => {
		if (first && second && amount) {
			try {
				const priceTuple = await blockchain.query("ft3.get_price", {
					first: first,
					second: second,
					amount: amount
				})
				setter(parseFloat(priceTuple?.quote).toFixed(18))
				setRate(parseFloat(priceTuple?.current_price).toFixed(18))
			} catch (err) {
				console.log(err)
				toast(err.shortReason)
			}
		}
	}

	const checkPair = async (first, second) => {
		try {
			const resp = await blockchain.query("ft3.get_pair", {
				a1: first,
				a2: second,
			})
			JSON.parse(resp)
			setPairId(firstToken?.id.toString("hex") + "_" + secondToken?.id.toString("hex"))
		} catch (err) {
			setPairId("")
			setRate("")
			toast("No liquidity found for pair")
		}
	}
	useEffect(() => {
		if (chromia_account) {
			loadTokenList()
		}
	}, [chromia_account?.id])

	useEffect(() => {
		if (firstToken && secondToken) {
			checkPair(firstToken?.id, secondToken?.id)
		}
	}, [firstToken?.id.toString("hex"), secondToken?.id.toString("hex")])

	useEffect(() => {
		if (pairId) {
			if (firstTokenAmount) {
				fetchPrice(firstToken?.id, secondToken?.id, firstTokenAmount, setSecondTokenAmount)
			}
		}
	}, [pairId, firstTokenAmount])

	let modalCallback = () => { }
	let modalTokenList = []
	if (tokenListModalMode === "TOKEN1") {
		modalCallback = (val) => { setFirstToken(val); setFirstTokenAmount(""); setSecondTokenAmount("") }
		modalTokenList = secondToken ? tokenList[secondToken?.id?.toString('hex')] : tokenList['default'];
	} else if (tokenListModalMode === "TOKEN2") {
		modalCallback = (val) => { setSecondToken(val); setSecondTokenAmount("") }
		modalTokenList = firstToken ? tokenList[firstToken?.id?.toString('hex')] : tokenList['default'];
	}

	const isValid = firstToken && secondToken && parseFloat(firstTokenAmount) && parseFloat(secondTokenAmount) && pairId
	const showReset = firstToken || secondToken
	return (
		<Wrapper>
			<LoadingOverlay
				className="hp-main-layout-content"
				active={processing}
				spinner={<PuffLoader color={"#5bc8d3"} />}>
				<CommonTokenSelector slippageTolerance={slippageTolerance} setSlippageTolerance={setSlippageTolerance} showReset={showReset} onReset={reset}>
					<div data-projection-id="12" style={{ opacity: 1, transform: 'none' }}>
						<div className="mb-5 border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
							<div className="relative flex gap-3 flex-col mt-16">
								<div className="tokenSelector group flex min-h-[70px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600">
									<div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600" data-bs-toggle="modal" data-bs-target="#exampleModal">
										<span className="mb-1.5 block text-xs uppercase text-gray-600 dark:text-gray-400">From</span>
										<button className="flex items-center font-medium outline-none dark:text-gray-100 exchange-coin" onClick={() => setTokenListModalMode("TOKEN1")}>
											<span className="ltr:ml-2 rtl:mr-2">{firstToken?.name || "Select Token"} </span>
											<svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:ml-1.5 rtl:mr-1.5">
												<path fillRule="evenodd" clipRule="evenodd" d="M10.6635 0.336517C10.9719 0.644826 10.9719 1.14469 10.6635 1.453L6.45302 5.66353C6.14471 5.97184 5.64484 5.97184 5.33653 5.66353L1.12601 1.453C0.817699 1.14469 0.817699 0.644826 1.12601 0.336517C1.43432 0.0282085 1.93418 0.0282085 2.24249 0.336517L5.89478 3.9888L9.54706 0.336517C9.85537 0.0282085 10.3552 0.0282085 10.6635 0.336517Z" fill="currentColor"></path>
											</svg>
										</button>
									</div>
									<div className="flex flex-1 flex-col text-right">
										<input disabled={!firstToken} type="text" placeholder="0.0" inputMode="decimal"
											className="w-full rounded-tr-lg rounded-br-lg border-0 exchange-value pb-0.5 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
											value={firstTokenAmount}
											onChange={(e) => {
												const amount = e.target.value;
												if (amount === '') {
													setFirstTokenAmount('')
												} else if (amount.match(DECIMAL_REGEX)) {
													setFirstTokenAmount(e.target.value);
												}
											}} />
										{/* <span className="font-xs px-3 text-gray-400">= $0.00</span> */}
									</div>
								</div>
								<div className="absolute top-1/2 left-1/2 z-[1] -mt-4 -ml-4 rounded-full shadow-large dark:bg-gray-600">
									<button
										onClick={() => {
											const tempName = firstToken
											const tempAmount = firstTokenAmount
											setFirstToken(secondToken)
											setFirstTokenAmount(secondTokenAmount)
											setSecondToken(tempName)
											setSecondTokenAmount(tempAmount)
											setRate(1 / rate)
										}}
										className="relative inline-flex shrink-0 items-center justify-center overflow-hidden text-center text-xs font-medium outline-none transition-all sm:text-sm text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800  text-gray-900 dark:text-white rounded-full w-8 h-8" style={{ border: 'none' }}>
										<span className="">
											<svg viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-3">
												<path d="M7.42422 2.96288C7.68877 3.22743 8.11769 3.22743 8.38223 2.96288L9.03226 2.31285L9.03226 11.5161C9.03226 11.8903 9.33555 12.1935 9.70968 12.1935C10.0838 12.1935 10.3871 11.8903 10.3871 11.5161L10.3871 2.31285L11.0371 2.96288C11.3017 3.22743 11.7306 3.22743 11.9951 2.96288C12.2597 2.69833 12.2597 2.26941 11.9951 2.00486L10.1887 0.198412C9.92414 -0.0661372 9.49522 -0.0661371 9.23067 0.198412L7.42422 2.00486C7.15967 2.26941 7.15967 2.69833 7.42422 2.96288Z" fill="currentColor"></path>
												<path d="M3.16129 11.6871L3.81132 11.0371C4.07586 10.7726 4.50478 10.7726 4.76933 11.0371C5.03388 11.3017 5.03388 11.7306 4.76933 11.9951L2.96288 13.8016C2.69833 14.0661 2.26941 14.0661 2.00486 13.8016L0.198412 11.9951C-0.0661371 11.7306 -0.0661372 11.3017 0.198412 11.0371C0.46296 10.7726 0.891878 10.7726 1.15643 11.0371L1.80645 11.6871L1.80645 2.48387C1.80645 2.10974 2.10974 1.80645 2.48387 1.80645C2.858 1.80645 3.16129 2.10974 3.16129 2.48387L3.16129 11.6871Z" fill="currentColor"></path>
											</svg>
										</span>
									</button>
								</div>
								<div className="tokenSelector group flex min-h-[70px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600">
									<div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600" data-bs-toggle="modal" data-bs-target="#exampleModal">
										<span className="mb-1.5 block text-xs uppercase text-gray-600 dark:text-gray-400">To</span>
										<button className="flex items-center font-medium outline-none dark:text-gray-100 exchange-coin" onClick={() => setTokenListModalMode("TOKEN2")}>
											<span className="ltr:ml-2 rtl:mr-2">{secondToken?.name || "Select Token"} </span>
											<svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:ml-1.5 rtl:mr-1.5">
												<path fillRule="evenodd" clipRule="evenodd" d="M10.6635 0.336517C10.9719 0.644826 10.9719 1.14469 10.6635 1.453L6.45302 5.66353C6.14471 5.97184 5.64484 5.97184 5.33653 5.66353L1.12601 1.453C0.817699 1.14469 0.817699 0.644826 1.12601 0.336517C1.43432 0.0282085 1.93418 0.0282085 2.24249 0.336517L5.89478 3.9888L9.54706 0.336517C9.85537 0.0282085 10.3552 0.0282085 10.6635 0.336517Z" fill="currentColor"></path>
											</svg>
										</button>
									</div>
									<div className="flex flex-1 flex-col text-right">
										<input disabled={true} type="text" placeholder="0.0" inputMode="decimal"
											className="w-full rounded-tr-lg rounded-br-lg border-0 exchange-value pb-0.5 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
											value={secondTokenAmount}
											onChange={(e) => {
												const amount = e.target.value;
												if (amount === '') {
													setSecondTokenAmount('')
												} else if (amount.match(DECIMAL_REGEX)) {
													setSecondTokenAmount(e.target.value);
												}
											}} />
										{/* <span className="font-xs px-3 text-gray-400">= $0.00</span> */}
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4 xs:gap-[18px]">
							{rate && <div className="flex items-center justify-between dark:text-gray-300"><span className="font-medium">Rate</span><span>1 {firstToken?.name} = {rate} {secondToken?.name}</span></div>}
							<div className="flex items-center justify-between dark:text-gray-300"><span className="font-medium">Price Slippage</span><span>{slippageTolerance}%</span></div>
							{rate && secondTokenAmount && <div className="flex items-center justify-between dark:text-gray-300"><span className="font-medium">Min. Received</span><span>{getMinReceived(secondTokenAmount, slippageTolerance)}</span></div>}
							{/* <div className="flex items-center justify-between dark:text-gray-300"><span className="font-medium">Offered by</span><span>_ _</span></div> */}
							{/* <div className="flex items-center justify-between dark:text-gray-300"><span className="font-medium">Network Fee</span><span>_ _</span></div> */}
							{/* <div className="flex items-center justify-between dark:text-gray-300"><span className="font-medium">Criptic Fee</span><span>_ _</span></div> */}
						</div><br />
						<button
							disabled={!isValid}
							onClick={swapToken}
							className="btn relative inline-flex shrink-0 items-center justify-center overflow-hidden text-center text-xs font-medium outline-none transition-all sm:text-sm bg-brand border-brand hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none w-full text-white rounded-md sm:rounded-lg px-7 sm:px-9 h-11 sm:h-13 mt-6 xs:mt-8 xs:tracking-widest" style={{ background: '#5bc8d3', fontSize: '20px' }}><span className="">Swap</span></button>
					</div>
					<TokenListModal
						mode={tokenListModalMode}
						onClose={closeModal}
						callback={modalCallback}
						tokenList={modalTokenList}
						firstToken={firstToken}
						secondToken={secondToken} />
				</CommonTokenSelector>
			</LoadingOverlay>
		</Wrapper>
	)
}

export default SwapTokenComponent