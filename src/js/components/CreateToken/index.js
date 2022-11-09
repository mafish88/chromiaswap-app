import { useState } from "react";
import CreateTokenComponent from "./createToken";

const CreateToken = () => {
	const [key, setKey] = useState(Date.now())
	return (
		<CreateTokenComponent key={key} setKey={setKey} />
	)
}

export default CreateToken