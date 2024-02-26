export const getTokenListForSwap = (assetBalances, pairs) => {
	const balanceObj = assetBalances.reduce((acc, curr) => {
		acc[curr?.asset?.id.toString('hex')] = curr;
		return acc;
	}, {});

	let tokenListObj = {
		default: []
	}

	pairs?.forEach(element => {
		const asset1 = element?.asset1?.toLowerCase()
		const asset2 = element?.asset2?.toLowerCase()
		if (balanceObj[asset1] && balanceObj[asset1].amount > 0
			&& balanceObj[asset2] && balanceObj[asset2].amount > 0) {

			if (tokenListObj[asset1]) {
				if (tokenListObj[asset1].indexOf(asset2) === -1) {
					tokenListObj[asset1].push(asset2)
				}
			} else {
				tokenListObj[asset1] = [asset2]
			}

			if (tokenListObj[asset2]) {
				if (tokenListObj[asset2].indexOf(asset1) === -1) {
					tokenListObj[asset2].push(asset1)
				}
			} else {
				tokenListObj[asset2] = [asset1]
			}

			if (tokenListObj["default"].indexOf(asset1) === -1) {
				tokenListObj["default"].push(asset1)
			}

			if (tokenListObj["default"].indexOf(asset2) === -1) {
				tokenListObj["default"].push(asset2)
			}
		}
	});

	Object.keys(tokenListObj).forEach(key => {
		tokenListObj[key] = tokenListObj[key].map(val => balanceObj[val]);
	})

	return tokenListObj
}