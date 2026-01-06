import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

const Header = () => {
	return (
		<header className="flex items-center justify-between py-5 px-7 bg-white shadow-md">
			<div className="flex items-center gap-4">
				<a
					href="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-gray-600 transition-colors"
				>
					<FaGithub size={24} />
				</a>
				<h1 className="text-2xl font-bold text-gray-800">TSender</h1>
			</div>
			<ConnectButton />
		</header>
	);
};

export default Header;
