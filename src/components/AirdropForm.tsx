"use client";
import { useEffect, useMemo, useState } from "react";
import InputField from "./ui/InputField";
import { erc20Abi, chainsToTSender, tsenderAbi } from "../constants";
import { useAccount, useChainId, useConfig, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import calculateTotal from "../../test/calculateTotal/calculateTotal";
import SendButton from "./Button";
import { ButtonState } from "@/interfaces/buttonInterface";
import TransactionDetails from "./TransactionDetails";

const AirdropForm = () => {
	const [state, setState] = useState<ButtonState>({ isPending: false, isSuccess: false, isError: false });
	const [tokenName, setTokenName] = useState('');
	const [tokenAddress, setTokenAddress] = useState("");
	const [recipients, setRecipients] = useState("");
	const [amounts, setAmounts] = useState("");
	const chainId = useChainId();
	const config = useConfig();
	const account = useAccount();
	const total: number = useMemo(() => calculateTotal(amounts), [amounts]);
	const { writeContractAsync } = useWriteContract();
	

	async function getApprovedAmount(
		tSenderAddress: string | null,
	): Promise<number> {
		if (!tSenderAddress) {
			alert("no tSenderAddress");
			return 0;
		}

		const result = await readContract(config, {
			abi: erc20Abi,
			address: tokenAddress as `0x${string}`,
			functionName: "allowance",
			args: [account.address, tSenderAddress],
		});
		return result as number;
	}

	useEffect(() => {console.log(state)}, [state.isPending])

	async function handleSubmit() {
		setState((state) => ({...state, isPending: true}))
		const tSenderAddress = chainsToTSender[chainId]["tsender"];

		
		try {
			const approvedAmount = await getApprovedAmount(tSenderAddress);
			if (approvedAmount < total) {
				const approvalHash = await writeContractAsync({
					abi: erc20Abi,
					address: tokenAddress as `0x${string}`,
					functionName: "approve",
					args: [tSenderAddress, BigInt(total)]
				})
	
				const approvalReceipt = await waitForTransactionReceipt(config, {
					hash: approvalHash
				})
	
				console.log(approvalReceipt);
			} else {
				const approvalHash = await writeContractAsync({
					abi: tsenderAbi,
					address: tSenderAddress as `0x${string}`,
					functionName: "airdropERC20",
					args: [
						tokenAddress,
						recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
						amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
						BigInt(total)
					]
				})
	
				const approvalReceipt = await waitForTransactionReceipt(config, {
					hash: approvalHash
				})
	
				console.log(approvalReceipt);
			}
			setState((state) => ({...state, isSuccess: true, isError: false}))
		} catch (error) {
			setState((state) => ({...state, isSuccess: false, isError: true}))
			console.log(error);
		} finally {
			setState((state) => ({...state, isPending: false}))
		}
	}

	
	useEffect(() => {
		async function getTokenName() {
			try {const result = await readContract(config, {
				abi: erc20Abi,
				address: tokenAddress as `0x${string}`,
				functionName: "name",
			}) as string;
				setTokenName(result);
			} catch (error) {
				setTokenName('');
				console.log(error);
			}
		}
		getTokenName()
	}, [tokenAddress])

	useEffect(() => {
		const tokenAddressLocalStorage = localStorage.getItem('tokenAddress');
		console.log(tokenAddressLocalStorage)
		if (tokenAddressLocalStorage) {
			setTokenAddress(tokenAddressLocalStorage);
		}

		const recipientsLocalStorage = localStorage.getItem('recipients');
		if (recipientsLocalStorage) {
			setTokenAddress(recipientsLocalStorage);
		}

		const amountsLocalStorage = localStorage.getItem('amounts');
		if (amountsLocalStorage) {
			setTokenAddress(amountsLocalStorage);
		}
	}, [])

	function handleReset() {
		setTokenAddress('');
		setRecipients('')
		setAmounts('')
	}

	return (
		<div className="p-10 rounded-xl border-2 border-blue-600 space-y-5 w-full shadow-2xl">
			<InputField
				label="Token Address"
				placeholder="0x"
				value={tokenAddress}
				onChange={(e) => {
					setTokenAddress(e.target.value);
					localStorage.setItem('tokenAddress', e.target.value);
				}}
			/>
			<InputField
				label="Recipients"
				placeholder="0x12345, 0x56789, ..."
				value={recipients}
				onChange={(e) => {
					setRecipients(e.target.value);
					localStorage.setItem('recipients', recipients);
				}}
			/>
			<InputField
				label="Amounts"
				placeholder="100, 200, ..."
				value={amounts}
				onChange={(e) => {
					setAmounts(e.target.value);
					localStorage.setItem('amounts', amounts);
				}}
			/>
			<TransactionDetails total={total} tokenName={tokenName} />
			<button className={`cursor-pointer flex items-center justify-center w-full py-3 px-5 rounded-[9px] bg-amber-200 hover:bg-amber-300 text-white transition-colors font-semibold relative border`} onClick={handleReset}>
				Reset inputs
			</button>
			<SendButton state={state} handleSubmit={handleSubmit} />
		</div>
	);
};

export default AirdropForm;
