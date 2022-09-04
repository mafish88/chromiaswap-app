import TokenInfoForm from "./TokenInfoForm"
import TokenSteps from "./TokenSteps"

const CreateToken = ({callback}) => {
	return (
		<div className="hp-main-layout-content">
			<div className="row mb-32 gy-32">
				<div className="col-12">
					<div className="row bg-black-0 hp-bg-color-dark-100 rounded pe-16 pe-sm-32 mx-0 create-token">
						<TokenSteps />
						<TokenInfoForm callback={callback}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateToken