import { FaWallet } from "react-icons/fa";
function Navbar() {
    return (
        <nav className="navbar">
           <FaWallet style={{marginRight: "8px" }}/>
           <span>Paystack Wallet</span>
        </nav>
    );
}
export default Navbar;