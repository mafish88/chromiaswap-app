import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingOverlay from "react-loading-overlay";
import { PuffLoader } from "react-spinners";
import { AppContext } from "../../../../context/AppContext";
import { DECIMAL_REGEX, TOKEN_LIST_PAGE } from "../../../../utils/constants";
import ReactTooltip from "react-tooltip";

const TokenInfoForm = ({ callback }) => {

	const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" });
	const { changePage } = useContext(AppContext)
	const [processing, setProcessing] = useState(false)
	const [tooltip, showTooltip] = useState(true);

	const onSubmit = async (data) => {
		setProcessing(true)
		const isSuccess = await callback(data);
		setProcessing(false)
		if (isSuccess) {
			changePage(TOKEN_LIST_PAGE)
		}
	}

	return (
		<LoadingOverlay
			active={processing}
			spinner={<PuffLoader color={"#5bc8d3"} />}>
			<div className="col ps-16 ps-sm-32 py-24 py-sm-32 overflow-hidden">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h3>Basic token information.</h3>
					<p>Tell us the basics about the token you are building.</p>
					<hr />
					<br />

					<div className="form-group mb-4">
						<label htmlFor="Tokenname">Token Name</label>
						<input type="text" className="form-control" id="tokenname" placeholder="Choose a name for your token (e.g. “ChromiaSwap”)"
							{...register("tokenName", { required: true })} />
					</div>
					<br />
				
					<div className="form-group mb-4">
						<label htmlFor="InitialSupply">Initial Supply</label>
						<input type="number" step="any" min="0.01" className="form-control" id="initialSupply" placeholder="Insert the initial supply of tokens available. Will be put in your account."
							{...register("initialSupply", { required: true, min: 1e-18, pattern: DECIMAL_REGEX })}
							data-tip data-for="initalSupplyInput"
							onMouseEnter={() => showTooltip(true)}
							onMouseLeave={() => {
								showTooltip(false);
								setTimeout(() => showTooltip(true), 50);
							}}
							 onChange={(event) => {
							 	const amount = event.target.value;
							 	if (!amount.match(DECIMAL_REGEX)) {
							 		event.preventDefault();
							 	}
							 }}
						/>

					</div>
					<br />
					<div className="d-flex align-items-center justify-content-end">
						<input disabled={!isValid} type="submit" name="Next" value="Submit" className="btn btn-primary" />
					</div>
				</form>
				{
					tooltip &&
					<ReactTooltip id="initalSupplyInput">
						<span>Inital Supply must be greater than 0. Maximum 18 decimal places allowed</span>
					</ReactTooltip>
				}
			</div>
		</LoadingOverlay>
	)
}

export default TokenInfoForm