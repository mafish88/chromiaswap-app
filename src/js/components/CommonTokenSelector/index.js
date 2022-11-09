import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { ADD_LIQUIDITY_PAGE, SWAP_TOKEN_PAGE } from "../../utils/constants"
import SlippageToleranceModal from "./SlippageToleranceModal"

const CommonTokenSelector = ({ slippageTolerance, setSlippageTolerance, showReset, onReset, children }) => {
	const { page, changePage } = useContext(AppContext)
	const [showModal, setShowModal] = useState(false)
	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<div className="row mb-32 gy-32">
			<div className="col-12">
				<div className="row bg-black-0 hp-bg-color-dark-100 rounded mx-0 create-token">
					<div className="col hp-profile-menu py-24">
						<div className="mx-auto w-full max-w-lg rounded-lg p-5 pt-4 shadow-card dark:bg-light-dark xs:p-6 xs:pt-5">
							<nav className="mb-5 min-h-[40px] border-b border-dashed border-gray-200 pb-4 uppercase dark:border-gray-700 xs:mb-6 xs:pb-5 xs:tracking-wide" style={{ marginTop: '10px' }}>
								<div className="hidden items-center justify-between text-gray-600 dark:text-gray-400 sm:flex">
									<div style={{ minWidth: '15%' }}>
										{page === SWAP_TOKEN_PAGE && <button className="relative inline-flex shrink-0 items-center justify-center filter-border overflow-hidden text-center text-xs font-medium outline-none transition-all sm:text-sm text-brand hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full w-10 h-10 dark:text-white" data-bs-toggle="modal" data-bs-target="#slippage"
											onClick={() => { setShowModal(true) }}>
											<span className="">
												<svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd" d="M8.33281 2.8H0.85C0.518629 2.8 0.25 2.53137 0.25 2.2C0.25 1.86863 0.518629 1.6 0.85 1.6H8.33281C8.59399 0.676598 9.44298 0 10.45 0C11.457 0 12.306 0.676598 12.5672 1.6H13.65C13.9814 1.6 14.25 1.86863 14.25 2.2C14.25 2.53137 13.9814 2.8 13.65 2.8H12.5672C12.306 3.7234 11.457 4.4 10.45 4.4C9.44298 4.4 8.59399 3.7234 8.33281 2.8ZM9.45 2.2C9.45 1.64772 9.89772 1.2 10.45 1.2C11.0023 1.2 11.45 1.64772 11.45 2.2C11.45 2.75228 11.0023 3.2 10.45 3.2C9.89772 3.2 9.45 2.75228 9.45 2.2Z" fill="currentColor"></path>
													<path fillRule="evenodd" clipRule="evenodd" d="M6.16719 9.2H13.65C13.9814 9.2 14.25 8.93137 14.25 8.6C14.25 8.26863 13.9814 8 13.65 8H6.16719C5.90602 7.0766 5.05702 6.4 4.05 6.4C3.04298 6.4 2.19398 7.0766 1.93281 8H0.85C0.518629 8 0.25 8.26863 0.25 8.6C0.25 8.93137 0.518629 9.2 0.85 9.2H1.93281C2.19398 10.1234 3.04298 10.8 4.05 10.8C5.05702 10.8 5.90602 10.1234 6.16719 9.2ZM3.05 8.6C3.05 8.04772 3.49772 7.6 4.05 7.6C4.60228 7.6 5.05 8.04772 5.05 8.6C5.05 9.15229 4.60228 9.6 4.05 9.6C3.49772 9.6 3.05 9.15229 3.05 8.6Z" fill="currentColor"></path>
												</svg>
											</span>
										</button>}
									</div>
									{page === SWAP_TOKEN_PAGE && <div className={`py-1.5 px-3 font-medium relative 'text-white btn-primary`} href="#" style={{ borderRadius: '10px', margin: "auto" }}>
										<span>Swap</span>
										<span className="absolute left-0 right-0 bottom-0 -z-[1] h-full w-full rounded-lg bg-brand shadow-large" data-projection-id="11" style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}></span>
									</div>}
									{page === ADD_LIQUIDITY_PAGE && <div className={`relative z-[1] inline-flex items-center py-1.5 px-3 'text-white btn-primary`} href="#" style={{ borderRadius: '10px', margin: 'auto' }}>
										<span>Liquidity</span>
									</div>}
									{
										// <button className="relative inline-flex shrink-0 items-center justify-center filter-border overflow-hidden text-center text-xs font-medium outline-none transition-all sm:text-sm text-brand hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full w-10 h-10 dark:text-white" data-bs-toggle="modal" data-bs-target="#slippage"
										// 	onClick={() => { setShowModal(true) }}>
										// 	<span className="">
										// 		<svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
										// 			<path fillRule="evenodd" clipRule="evenodd" d="M8.33281 2.8H0.85C0.518629 2.8 0.25 2.53137 0.25 2.2C0.25 1.86863 0.518629 1.6 0.85 1.6H8.33281C8.59399 0.676598 9.44298 0 10.45 0C11.457 0 12.306 0.676598 12.5672 1.6H13.65C13.9814 1.6 14.25 1.86863 14.25 2.2C14.25 2.53137 13.9814 2.8 13.65 2.8H12.5672C12.306 3.7234 11.457 4.4 10.45 4.4C9.44298 4.4 8.59399 3.7234 8.33281 2.8ZM9.45 2.2C9.45 1.64772 9.89772 1.2 10.45 1.2C11.0023 1.2 11.45 1.64772 11.45 2.2C11.45 2.75228 11.0023 3.2 10.45 3.2C9.89772 3.2 9.45 2.75228 9.45 2.2Z" fill="currentColor"></path>
										// 			<path fillRule="evenodd" clipRule="evenodd" d="M6.16719 9.2H13.65C13.9814 9.2 14.25 8.93137 14.25 8.6C14.25 8.26863 13.9814 8 13.65 8H6.16719C5.90602 7.0766 5.05702 6.4 4.05 6.4C3.04298 6.4 2.19398 7.0766 1.93281 8H0.85C0.518629 8 0.25 8.26863 0.25 8.6C0.25 8.93137 0.518629 9.2 0.85 9.2H1.93281C2.19398 10.1234 3.04298 10.8 4.05 10.8C5.05702 10.8 5.90602 10.1234 6.16719 9.2ZM3.05 8.6C3.05 8.04772 3.49772 7.6 4.05 7.6C4.60228 7.6 5.05 8.04772 5.05 8.6C5.05 9.15229 4.60228 9.6 4.05 9.6C3.49772 9.6 3.05 9.15229 3.05 8.6Z" fill="currentColor"></path>
										// 		</svg>
										// 	</span>
										// </button>
										<button
											disabled={!showReset}
											onClick={onReset}
											className="btn py-1.5 px-3 font-medium relative text-white btn" style={{ background: '#ff0022', borderRadius: '10px' }}><span className="">Reset</span></button>

									}

									<SlippageToleranceModal slippageTolerance={slippageTolerance} show={showModal} onClose={closeModal} callback={(slippage) => setSlippageTolerance(slippage)} />
								</div>
							</nav>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CommonTokenSelector