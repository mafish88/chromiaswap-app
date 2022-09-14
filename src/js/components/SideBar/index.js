import React, { useContext } from 'react';
import logo from '../../../img/logo.png'
import favIcon from '../../../img/favicon.png'
import { AppContext } from '../../context/AppContext';
import { ADD_LIQUIDITY_PAGE, CREATE_TOKEN_PAGE, SWAP_TOKEN_PAGE, TOKEN_LIST_PAGE } from '../../utils/constants';

const SideBar = () => {

	const { page, changePage } = useContext(AppContext)

	return (
		<div className='hp-sidebar hp-bg-color-black-0 hp-bg-color-dark-100'>
			<div className="hp-sidebar-container">
				<div className="hp-sidebar-header-menu">
					<div className="row justify-content-between align-items-end me-12 ms-24 mt-24">
						<div className="w-auto px-0 hp-sidebar-collapse-button hp-sidebar-visible">
							<button type="button" className="btn btn-text btn-icon-only">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
								</svg>
							</button>
						</div>
						<div className="w-auto px-0">
							<div className="hp-header-logo d-flex align-items-end">
								<a href="#">
									<img className="hp-logo hp-sidebar-visible" src={favIcon} alt="logo" />
									<img className="hp-logo hp-sidebar-hidden hp-dir-none hp-dark-none" src={logo} alt="logo" />
									<img className="hp-logo hp-sidebar-hidden hp-dir-none hp-dark-block" src={logo} alt="logo" />
									<img className="hp-logo hp-sidebar-hidden hp-dir-block hp-dark-none" src={logo} alt="logo" />
									<img className="hp-logo hp-sidebar-hidden hp-dir-block hp-dark-block" src={logo} alt="logo" />
								</a>
							</div>
						</div>
						<div className="w-auto px-0 hp-sidebar-collapse-button hp-sidebar-hidden">
							<button type="button" className="btn btn-text btn-icon-only">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
								</svg>
							</button>
						</div>
					</div>
					<ul>
						<li>
							<div className="menu-title">General</div>
							<ul>
								<li>
									<a href="#" className={page == SWAP_TOKEN_PAGE ? "active" : ""} onClick={() => changePage(SWAP_TOKEN_PAGE)}>
										<span>
											<svg width="24" height="24" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}><path d="M3.38615 1.32163C3.68849 1.01929 3.68849 0.529097 3.38615 0.226756C3.08381 -0.0755854 2.59361 -0.0755854 2.29127 0.226756L0.226756 2.29127C-0.0755854 2.59361 -0.0755854 3.08381 0.226756 3.38615L2.29127 5.45066C2.59361 5.75301 3.08381 5.75301 3.38615 5.45066C3.68849 5.14832 3.68849 4.65813 3.38615 4.35579L2.64326 3.6129H13.1613C13.5889 3.6129 13.9355 3.26628 13.9355 2.83871C13.9355 2.41113 13.5889 2.06452 13.1613 2.06452H2.64326L3.38615 1.32163Z" fill="currentColor"></path><path d="M12.6139 8.48482C12.3115 8.78716 12.3115 9.27735 12.6139 9.57969L13.3567 10.3226H2.83871C2.41113 10.3226 2.06452 10.6692 2.06452 11.0968C2.06452 11.5243 2.41113 11.871 2.83871 11.871H13.3567L12.6139 12.6139C12.3115 12.9162 12.3115 13.4064 12.6139 13.7087C12.9162 14.0111 13.4064 14.0111 13.7087 13.7087L15.7732 11.6442C16.0756 11.3419 16.0756 10.8517 15.7732 10.5493L13.7087 8.48482C13.4064 8.18248 12.9162 8.18248 12.6139 8.48482Z" fill="currentColor"></path></svg>
											<span>Swap</span>
										</span>
									</a>
								</li>
								<li>
									<a href="#" className={page == ADD_LIQUIDITY_PAGE ? "active" : ""} onClick={() => changePage(ADD_LIQUIDITY_PAGE)}>
										<span>
											<svg width="24" height="24" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}><path d="M5.42352 4.76612C5.55462 4.89722 5.73242 4.97087 5.91781 4.97087C6.10321 4.97087 6.28101 4.89722 6.4121 4.76612L7.34414 3.83408C7.54407 3.63416 7.60387 3.3335 7.49568 3.07229C7.38748 2.81108 7.13259 2.64076 6.84986 2.64076H4.98577C4.70304 2.64076 4.44815 2.81108 4.33995 3.07229C4.23176 3.3335 4.29156 3.63416 4.49148 3.83408L5.42352 4.76612Z" fill="currentColor"></path><path d="M5.42352 11.2339C5.55462 11.1028 5.73242 11.0291 5.91781 11.0291C6.10321 11.0291 6.28101 11.1028 6.4121 11.2339L7.34414 12.1659C7.54407 12.3658 7.60387 12.6665 7.49568 12.9277C7.38748 13.1889 7.13259 13.3592 6.84986 13.3592H4.98577C4.70304 13.3592 4.44815 13.1889 4.33995 12.9277C4.23176 12.6665 4.29156 12.3658 4.49148 12.1659L5.42352 11.2339Z" fill="currentColor"></path><path fliprule="evenodd" clipRule="evenodd" d="M6.98876 8L7.16332 7.84959C9.00451 6.26325 10.5353 4.349 11.678 2.20408C12.1264 1.36238 11.5697 0.336125 10.6196 0.253059L9.52586 0.157427C7.12508 -0.052476 4.71056 -0.0524757 2.30979 0.157428L1.216 0.25306C0.265927 0.336127 -0.290782 1.36238 0.15763 2.20408C1.30033 4.349 2.83114 6.26325 4.67232 7.84959L4.84689 8L4.67232 8.15041C2.83114 9.73675 1.30033 11.651 0.15763 13.7959C-0.290782 14.6376 0.265927 15.6639 1.216 15.7469L2.30979 15.8426C4.71056 16.0525 7.12508 16.0525 9.52586 15.8426L10.6196 15.7469C11.5697 15.6639 12.1264 14.6376 11.678 13.7959C10.5353 11.651 9.00451 9.73675 7.16332 8.15041L6.98876 8ZM5.92122 7.0738C5.92164 7.07364 5.92241 7.07335 5.92387 7.07208L6.25077 6.79044C7.93507 5.33926 9.33974 3.59265 10.3958 1.63688L9.40409 1.55018C7.08434 1.34736 4.75131 1.34736 2.43156 1.55018L1.43987 1.63688C2.49591 3.59265 3.90058 5.33926 5.58488 6.79044L5.91177 7.07208C5.91271 7.07289 5.91336 7.0733 5.91382 7.07354C5.91408 7.07367 5.91367 7.07348 5.91382 7.07354C5.91453 7.07379 5.91631 7.07433 5.91782 7.07433C5.91934 7.07433 5.92051 7.07406 5.92122 7.0738ZM5.92387 8.92792C5.92241 8.92665 5.92164 8.92636 5.92122 8.9262C5.92088 8.92608 5.92044 8.92595 5.9199 8.92585C5.91932 8.92574 5.91862 8.92567 5.91782 8.92567C5.91631 8.92567 5.91514 8.92594 5.91443 8.9262C5.91401 8.92636 5.91324 8.92665 5.91177 8.92792L5.58488 9.20956C3.90058 10.6607 2.49591 12.4073 1.43987 14.3631L2.43156 14.4498C4.75131 14.6526 7.08434 14.6526 9.40409 14.4498L10.3958 14.3631C9.33974 12.4074 7.93507 10.6607 6.25077 9.20956L5.92387 8.92792Z" fill="currentColor"></path></svg>
											<span>Liquidity</span>
										</span>
									</a>
								</li>
								<li>
									<a href="#" className={page == CREATE_TOKEN_PAGE ? "active" : ""} onClick={() => changePage(CREATE_TOKEN_PAGE)}>
										<span>
											<svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}><g clipPath="url(#clip0_5_47)"><path fliprule="evenodd" clipRule="evenodd" d="M9.01742 0.0283661C4.06527 0.0283661 0.026862 4.06041 0.0268555 9.01255C0.0268433 13.9647 4.06526 18.0015 9.01742 18.0015C13.9696 18.0015 18 13.9647 18 9.01255C18 4.06041 13.9696 0.0283661 9.01742 0.0283661V0.0283661ZM9.01742 1.66185C13.0868 1.66185 16.3665 4.94321 16.3665 9.01255C16.3665 13.0819 13.0868 16.368 9.01742 16.368C4.94806 16.368 1.66033 13.0819 1.66034 9.01255C1.66035 4.94321 4.94807 1.66185 9.01742 1.66185V1.66185ZM9.00466 4.91766C8.89672 4.91871 8.79006 4.94114 8.69085 4.98365C8.59163 5.02616 8.50183 5.08792 8.42662 5.16535C8.35142 5.24278 8.2923 5.33435 8.2527 5.43476C8.2131 5.53517 8.19379 5.64244 8.19589 5.75036V8.1974H5.74885C5.72069 8.19594 5.69247 8.19594 5.6643 8.1974C5.44748 8.20861 5.24399 8.3055 5.0986 8.46675C4.9532 8.62799 4.87782 8.84039 4.88903 9.05722C4.90025 9.27404 4.99713 9.47753 5.15838 9.62292C5.31963 9.76831 5.53202 9.8437 5.74885 9.83248H8.19589V12.2795C8.19589 12.4964 8.28202 12.7043 8.43534 12.8576C8.58866 13.0109 8.79661 13.0971 9.01343 13.0971C9.23026 13.0971 9.4382 13.0109 9.59152 12.8576C9.74484 12.7043 9.83097 12.4964 9.83097 12.2795V9.83248H12.278C12.4948 9.83248 12.7028 9.74635 12.8561 9.59303C13.0094 9.43971 13.0956 9.23177 13.0956 9.01494C13.0956 8.79812 13.0094 8.59017 12.8561 8.43685C12.7028 8.28354 12.4948 8.1974 12.278 8.1974H9.83097V5.75036C9.83311 5.64096 9.81324 5.53225 9.77255 5.43068C9.73186 5.3291 9.67118 5.23674 9.5941 5.15908C9.51703 5.08141 9.42514 5.02002 9.32388 4.97855C9.22263 4.93708 9.11407 4.91637 9.00466 4.91766V4.91766Z" fill="currentColor"></path></g><defs><clipPath id="clip0_5_47"><rect width="18" height="18" fill="currentColor"></rect></clipPath></defs></svg>
											<span>Create Token</span>
										</span>
									</a>
								</li>
								<li>
									<a href="#" className={page == TOKEN_LIST_PAGE ? "active" : ""} onClick={() => changePage(TOKEN_LIST_PAGE)}>
										<span>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ marginRight: '10px' }} fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
												<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"></path>
												<path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
											</svg>
											<span>Token List</span>
										</span>
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
};


export default SideBar