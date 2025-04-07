// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios"
// import { useState } from "react";

// export const SendMoney = () => {
//     const [searchParams] = useSearchParams();
//     const id = searchParams.get("id");
//     const name = searchParams.get("name");
//     const [amount, setAmount] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleTransfer = async () => {
//         if (amount <= 0) {
//             alert("Please enter a valid amount.");
//             return;
//         }

//         setLoading(true);
//         setError("");

//         try {
//             await axios.post("http://localhost:3000/api/v1/account/transfer", {
//                 to: id,
//                 amount
//             }, {
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("token")
//                 }
//             });

//             alert("Transfer successful!");
//             navigate("/dashboard"); // Redirect to dashboard or wherever you want after success
//         } catch (err) {
//             console.error("Transfer error:", err);
//             setError("Transfer failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center h-screen bg-gray-100">
//             <div className="h-full flex flex-col justify-center">
//                 <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
//                     <div className="flex flex-col space-y-1.5 p-6">
//                         <h2 className="text-3xl font-bold text-center">Send Money</h2>
//                     </div>
//                     <div className="p-6">
//                         <div className="flex items-center space-x-4">
//                             <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
//                                 <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
//                             </div>
//                             <h3 className="text-2xl font-semibold">{name}</h3>
//                         </div>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium leading-none" htmlFor="amount">
//                                     Amount (in Rs)
//                                 </label>
//                                 <input
//                                     onChange={(e) => setAmount(Number(e.target.value))}
//                                     type="number"
//                                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                                     id="amount"
//                                     placeholder="Enter amount"
//                                 />
//                             </div>
//                             {error && <div className="text-red-500">{error}</div>}
//                             <button 
//                                 onClick={handleTransfer}
//                                 disabled={loading}
//                                 className={`justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full ${loading ? 'bg-gray-400' : 'bg-green-500'} text-white`}
//                             >
//                                 {loading ? "Processing..." : "Initiate Transfer"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button } from "../components/Button";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleConfirm = () => {
        if (!amount || Number(amount) <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        setShowConfirmation(true);
    };

    const handleTransfer = async () => {
        setLoading(true);
        setError("");

        try {
            await axios.post("https://paytmwallet-6aeq.onrender.com/api/v1/account/transfer", {
                to: id,
                amount: Number(amount)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            
            // Show success animation here
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
            
        } catch (err) {
            console.error("Transfer error:", err);
            setError(err.response?.data?.message || "Transfer failed. Please try again.");
            setShowConfirmation(false);
            setLoading(false);
        }
    };

    const getBgGradient = () => {
        const gradients = [
            "from-purple-500 to-indigo-500",
            "from-pink-500 to-rose-500",
            "from-amber-500 to-orange-500",
            "from-teal-500 to-emerald-500",
            "from-blue-500 to-cyan-500",
        ];
        const hash = name.charCodeAt(0) % gradients.length;
        return gradients[hash];
    };

    if (showConfirmation) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex justify-center items-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 transform transition-all duration-500 scale-100">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirm Transfer</h2>
                        <p className="text-gray-500">You're about to send money to {name}</p>
                    </div>
                    
                    <div className="bg-indigo-50 rounded-xl p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Amount</span>
                            <span className="text-xl font-bold text-indigo-600">₹{Number(amount).toLocaleString()}</span>
                        </div>
                        
                        {note && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Note</span>
                                <span className="text-gray-800">{note}</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <Button 
                            onClick={handleTransfer}
                            disabled={loading}
                            label={loading ? "Processing Transfer..." : "Confirm Transfer"}
                            variant="success"
                        />
                        {!loading && (
                            <Button 
                                onClick={() => setShowConfirmation(false)}
                                label="Edit Details"
                                variant="secondary"
                            />
                        )}
                    </div>
                    
                    {loading && (
                        <div className="mt-6 flex justify-center">
                            <div className="animate-spin h-8 w-8 border-4 border-green-500 rounded-full border-t-transparent"></div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${getBgGradient()} rounded-2xl flex items-center justify-center mb-4 transform rotate-3 shadow-lg`}>
                        <span className="text-3xl font-bold text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Send to {name}</h2>
                    <p className="text-gray-500 text-sm mt-1">Transfer money instantly</p>
                </div>
                
                <div className="mb-6 relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Amount (in ₹)
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-gray-500 font-medium">₹</span>
                        </div>
                        <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg font-medium"
                            placeholder="0.00"
                        />
                    </div>
                </div>
                
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Add a note (optional)
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                        placeholder="What's this for?"
                        rows="2"
                    ></textarea>
                </div>
                
                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                
                <div className="flex flex-col gap-3">
                    <Button 
                        onClick={handleConfirm}
                        label="Continue"
                        variant="primary"
                        iconAfter={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        }
                    />
                    <Button 
                        onClick={() => navigate("/dashboard")}
                        label="Cancel"
                        variant="secondary"
                    />
                </div>
            </div>
        </div>
    );
};