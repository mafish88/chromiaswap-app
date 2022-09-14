import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../../context/AppContext";
import { TOKEN_LIST_PAGE } from "../../../../utils/constants";
const TokenInfoForm = ({ callback }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm();
	const { changePage } = useContext(AppContext)

	const onSubmit = async (data) => {
		const isSuccess = await callback(data);
		if (isSuccess) {
			reset()
			changePage(TOKEN_LIST_PAGE)
		}
	}
	return (
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
					{errors.tokenName && <span className="bg-error">This field is required</span>}
				</div>
				<br />

				<div className="form-group mb-4">
					<label htmlFor="InitialSupply">Initial Supply</label>
					<input type="number" min="0" className="form-control" id="initialSupply" placeholder="Insert the initial of tokens available. Will be put in your account."
						{...register("initialSupply", { required: true, min: 1 })}
						onKeyPress={(event) => {
							if (!/[0-9]/.test(event.key)) {
								event.preventDefault();
							}
						}}
					/>
					{errors.initialSupply && errors.initialSupply.type === 'required' && <span className="bg-error">This field is required</span>}
					{errors.initialSupply && errors.initialSupply.type === 'min' && <span className="bg-error">Initial Supply must be greater than 0</span>}

				</div>
				<br />
				<div className="d-flex align-items-center justify-content-end">
					<input type="submit" name="Next" value="Submit" className="btn btn-primary" />
				</div>
			</form>
		</div>
	)
}

export default TokenInfoForm