const SlippageToleranceModal = ({ slippageTolerance, show = false, onClose, callback }) => {

	if (!show) {
		return null
	}
	return (
		<div className="modal fade show" id="slippage" tabIndex="-1" aria-labelledby="slippageLabel" style={{ display: 'block' }} aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modals-title  mb-0" id="slippageLabel">Slippage Tolerance</h4>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" className="bi bi-x-circle" viewBox="0 0 16 16">
								<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
							</svg>
						</button>
					</div>
					<div className="modal-body">
						 <div className="relative">
							<svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon left-6 h-full text-gray-700">
								<path fillRule="evenodd" clipRule="evenodd" d="M11.3851 12.4457C8.73488 14.5684 4.85544 14.4013 2.39866 11.9445C-0.237379 9.3085 -0.237379 5.03464 2.39866 2.3986C5.0347 -0.23744 9.30856 -0.23744 11.9446 2.3986C14.4014 4.85538 14.5685 8.73481 12.4458 11.3851L17.6014 16.5407C17.8943 16.8336 17.8943 17.3085 17.6014 17.6014C17.3085 17.8943 16.8337 17.8943 16.5408 17.6014L11.3851 12.4457ZM3.45932 10.8839C1.40907 8.83363 1.40907 5.50951 3.45932 3.45926C5.50957 1.40901 8.83369 1.40901 10.8839 3.45926C12.9327 5.50801 12.9342 8.82875 10.8885 10.8794C10.8869 10.8809 10.8854 10.8823 10.8839 10.8839C10.8824 10.8854 10.8809 10.8869 10.8794 10.8884C8.82882 12.9341 5.50807 12.9326 3.45932 10.8839Z" fill="currentColor"></path>
							</svg>
							<input type="search" placeholder=">1:00%" className="w-full search-input border-y border-x-0 border-dashed border-gray-200 py-3.5 pl-14 pr-6 text-sm focus:border-gray-300 focus:ring-0 dark:border-gray-700 dark:bg-light-dark-1 focus:dark:border-gray-600" />
						</div> 

						<ul role="listbox" className="min-h-[200px] py-3">
							<li tabIndex="0" className={`flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900 ${slippageTolerance === 0.1 ? "selected-token" : ""}`}
								onClick={() => {
									callback(0.1)
									onClose()
								}}>
								<span className="uppercase">0.1%</span>
							</li>
							<li tabIndex="1" className={`flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900 ${slippageTolerance === 0.5 ? "selected-token" : ""}`}
								onClick={() => {
									callback(0.5)
									onClose()
								}}>
								<span className="uppercase">0.5%</span>
							</li>
							<li tabIndex="2" className={`flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900 ${slippageTolerance === 1 ? "selected-token" : ""}`}
								onClick={() => {
									callback(1)
									onClose()
								}}>
								<span className="uppercase">1%</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SlippageToleranceModal