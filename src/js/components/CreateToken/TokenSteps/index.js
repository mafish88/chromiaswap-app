const TokenSteps = () => {
	return (
		<div className="col hp-profile-menu py-24" style={{flex: '0 0 240px'}}>
			<div className="w-100">
				<div>
					<ol className="steps is-vertical line-space [--size:2.75rem] [--line:.5rem]" style={{ paddingLeft: '1rem' }}>
						<li className="step space-x-4 pb-12 before:bg-slate-200 dark:before:bg-navy-500">
							<div className="step-header mask is-hexagon bg-primary text-white dark:bg-accent">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" className="bi bi-info-circle" viewBox="0 0 16 16">
									<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
									<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
								</svg>
							</div>
							<div className="text-left">
								<p className="text-xs text-slate-400 dark:text-navy-300" style={{marginBottom: '0.3rem'}}>
									Step 1/1
								</p>
								<h3 className="text-base font-medium text-primary dark:text-accent-light">
									Basic Information
								</h3>
							</div>
						</li>
						 <li className="step space-x-4 pb-12 before:bg-slate-200 dark:before:bg-navy-500">
							<div className="step-header mask is-hexagon bg-slate-200 text-slate-500 dark:bg-navy-500 dark:text-navy-100">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pie-chart" viewBox="0 0 16 16">
									<path d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793V1.018zm1 0V7.5h6.482A7.001 7.001 0 0 0 8.5 1.018zM14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
								</svg>
							</div>
							<div className="text-left">
								<p className="text-xs text-slate-400 dark:text-navy-300" style={{marginBottom: '0.3rem'}}>
									Step 2/4
								</p>
								<h3 className="text-base font-medium">Tokenomics</h3>
							</div>
						</li>
						<li className="step space-x-4 pb-12 before:bg-slate-200 dark:before:bg-navy-500">
							<div className="step-header mask is-hexagon bg-slate-200 text-slate-500 dark:bg-navy-500 dark:text-navy-100">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-boxes" viewBox="0 0 16 16">
									<path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
								</svg>
							</div>
							<div className="text-left">
								<p className="text-xs text-slate-400 dark:text-navy-300" style={{marginBottom: '0.3rem'}}>
									Step 3/4
								</p>
								<h3 className="text-base font-medium">Add features</h3>
							</div>
						</li>
						<li className="step space-x-4 before:bg-slate-200 dark:before:bg-navy-500">
							<div className="step-header mask is-hexagon bg-slate-200 text-slate-500 dark:bg-navy-500 dark:text-navy-100">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
									<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"></path>
									<path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"></path>
								</svg>
							</div>
							<div className="text-left">
								<p className="text-xs text-slate-400 dark:text-navy-300" style={{marginBottom: '0.3rem'}}>
									Step 4/4
								</p>
								<h3 className="text-base font-medium">Deploy</h3>
							</div>
						</li> 
					</ol>
				</div>
			</div>
			<div className="hp-profile-menu-body w-100 text-start mt-48 mt-lg-0">
			</div>
		</div>
	)
}

export default TokenSteps