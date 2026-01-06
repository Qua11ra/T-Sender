import { ChangeEvent } from "react";

interface InputFieldProps {
	label?: string;
	placeholder: string;
	value: string;
	type?: string;
	large?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField = ({
	label,
	placeholder,
	value,
	type,
	large,
	onChange,
}: InputFieldProps) => {
	const inputId = label
		? label.toLowerCase().replace(/\s+/g, "-")
		: "input-field";

	return (
		<div className="w-full space-y-2">
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium text-gray-700"
				>
					{label}
				</label>
			)}
			{large ? (
				<textarea
					id={inputId}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className="w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-300"
					rows={4}
				></textarea>
			) : (
				<input
					id={inputId}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className="w-full px-4 py-2 border-gray-300 border rounded-md shadow-sm focus:ring-2 focus:ring-gray-300"
				/>
			)}
		</div>
	);
};

export default InputField;
