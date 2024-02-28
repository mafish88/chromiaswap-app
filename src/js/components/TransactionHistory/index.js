import { useContext, useEffect, useState } from "react";
import BlockchainContext from "../../../lib/blockchain/blockchain-context";
import { AppContext } from "../../context/AppContext";
import { gtx } from 'postchain-client'
import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Link } from "@mui/material";
import Wrapper from "../Wrapper";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CachedIcon from '@mui/icons-material/Cached';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useCallback } from "react";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#FFB600' },
		secondary: { main: '#9E5ECF' },
		error: { main: '#EB4521' }
	},
});



const getMinifiedString = (str) => {
	return `${str.slice(0, 4)} - ${str.slice(-4)}`
}

const deHex = s => Buffer.from(s).toString('hex')

const TransactionHistory = () => {

	const { chromia_account } = useContext(AppContext)
	const blockchain = useContext(BlockchainContext);
	const [txHistory, setTxHistory] = useState([]);

	const loadTransactionHistory = useCallback(async () => {
		const deHex = s => Buffer.from(s).toString('hex')
		const dex_history = await blockchain.query("ft3.get_dex_history", { acc_id: chromia_account?.id })
		console.log("history", gtx.deserialize(Buffer.from(dex_history[0].tx_data, 'hex')))
		console.log(dex_history)

		const tx = gtx.deserialize(Buffer.from(dex_history[0].tx_data, 'hex'))
		console.log(tx.signers.map(deHex))
		setTxHistory(dex_history.reverse())
	}, [blockchain, chromia_account?.id]) // Add an empty array as the second argument to useCallback


	useEffect(() => {
		if (chromia_account) {
			loadTransactionHistory()
		}
	}, [chromia_account, chromia_account.id, loadTransactionHistory])



	const tableRows = () => txHistory.map((entry, index) => {
		const transaction = gtx.deserialize(Buffer.from(entry.tx_data, 'hex'))
		const signers = transaction.signers.map(deHex);
		const display = [...signers].splice(0, 2)
		const more = [...signers].splice(2, signers.length)
		console.log("display+", display)

		return (
			<TableRow key={index}>
				<TableCell>
					<a href={`https://explorer-testnet.chromia.com/${transaction?.blockchainRID?.toString('hex')}/tx/${entry.tx_rid}`} target="_blank" rel="noopener noreferrer">
						<Box
							color="primary.main"
							scope="row"
							display="flex"
							alignItems="center">
							{entry.tx_rid && getMinifiedString(entry.tx_rid)}
						</Box>
					</a>
				</TableCell>
				<TableCell>
					<Box align="left">
						<Box display="flex" alignItems="center">
							{display.map(signer => (
								<Box
									display="flex"
									alignItems="center"
									mr={3}
									color="primary.main"
									component={Link}
									href={`https://explorer-testnet.chromia.com/${transaction?.blockchainRID?.toString('hex')}/signer/${signer}`}
									target="_blank"
									rel="noopener noreferrer"
									underline="none">
									<Box
										bgcolor="#4D617D"
										borderRadius="50%"
										width={30}
										height={30}
										overflow="hidden"
										display="flex"
										color="white"
										alignItems="center"
										justifyContent="center">
										<svg width={14} height={17} viewBox="0 0 18 17" fill="none">
											<path
												d="M16.68 4.351l-.896-.895.624-.623a1.356 1.356 0 10-1.917-1.92L6.71 8.694a4.26 4.26 0 101.917 1.917l2.649-2.647.54.54a1.24 1.24 0 001.753-1.753l-.54-.54 1.002-1.003.896.894a1.267 1.267 0 001.751 0 1.24 1.24 0 000-1.75zM4.823 10.372a2.125 2.125 0 110 4.247 2.125 2.125 0 010-4.246v-.001z"
												fill="currentColor"
											/>
										</svg>
									</Box>
									<Box
										color="primary.main"
										scope="row"
										display="flex"
										alignItems="center">
										{getMinifiedString(signer)}
									</Box>
								</Box>

							))}
							{!!more.length && (
								<Box
									bgcolor="background.paper"
									borderRadius="50%"
									width={30}
									height={30}
									display="flex"
									style={{ cursor: 'pointer' }}>
									<Box m="auto" color="white" fontSize="0.7rem">
										+{more.length}
									</Box>
								</Box>
							)}
						</Box>
					</Box></TableCell>
				<TableCell align="right">{formatDistanceToNow(entry?.timestamp)}</TableCell>
			</TableRow >
		)
	})

	return (
		<Wrapper>
			<div className="hp-main-layout-content">
				<div className="row mb-32 gy-32">
					<div className="col-12">
						<div className="row bg-black-0 hp-bg-color-dark-100 rounded mx-0 create-token">
							<div className="rounded-lg p-5 pt-4 shadow-card dark:bg-light-dark xs:p-6 xs:pt-5">
								<section className="coin-list">
									<div className="container">
										<div className="row">
											<div className="col-md-12">
												<div className="coin-list__main">
													<div className="flat-tabs">
														<div className="content-tab">
															<div className="content-inner" style={{ width: '75%', margin: 'auto' }}>
																<ThemeProvider theme={darkTheme}>
																	<h3 style={{ margin: '10px', width: 'fit-content' }}>Trasaction History <IconButton color="secondary" onClick={loadTransactionHistory}><CachedIcon /></IconButton></h3>
																	<CssBaseline />
																	<Table>
																		<TableHead>
																			<TableRow>
																				<TableCell>Transaction Id</TableCell>
																				<TableCell align="left">Signers</TableCell>
																				<TableCell align="right">Age</TableCell>
																			</TableRow>
																		</TableHead>
																		<TableBody>
																			{tableRows()}
																		</TableBody>
																	</Table>
																</ThemeProvider>

															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}

export default TransactionHistory;