import { useState } from "react"
import AddLiquidityComponent from "./addLiquidity";

const AddLiquidity = () => {
	const [key, setKey] = useState(Date.now())
	return (
		<AddLiquidityComponent key={key} setKey={setKey} />
	)
}

export default AddLiquidity;