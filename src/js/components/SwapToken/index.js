import { useState } from "react"
import SwapTokenComponent from "./swapToken";

const SwapToken = () => {
	const [key, setKey] = useState(Date.now())
	return (
		<SwapTokenComponent key={key} setKey={setKey} />
	)
}

export default SwapToken