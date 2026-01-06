export default function calculateTotal(amounts: string) {
	let result = 0;
	const amountsList = amounts.replaceAll("\n", ", ").split(",");

	for (let i = 0; i < amountsList.length; i++) {
		const num = parseFloat(amountsList[i].trim());

		if (!Number.isNaN(num)) result += num;
	}

	return result;
}
