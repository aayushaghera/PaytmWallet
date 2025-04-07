// import { useEffect, useState } from "react";
// import { Appbar } from "../components/Appbar";
// import { Balance } from "../components/Balance";
// import { Users } from "../components/Users";
// import axios from "axios"

// export const Dashboard = () => {
//     const [balance, setBalance] = useState(0);

//     useEffect(() => {
//         const fetchBalance = async () => {
//             try {
//                 const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
//                     headers: {
//                         Authorization: "Bearer " + localStorage.getItem("token"),
//                     },
//                 });
//                 setBalance(response.data.balance);
//             } catch (error) {
//                 console.error("Error fetching balance:", error);
//             }
//         };

//         fetchBalance();
//     }, []);

//     return (
//         <div>
//             <Appbar />
//             <div className="m-8">
//                 <Balance value={balance} />
//                 <Users />
//             </div>
//         </div>
//     );
// };


import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { Button } from "../components/Button";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const balanceResponse = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setBalance(balanceResponse.data.balance);
                
                // Assuming there's an endpoint to get user info
                // const userResponse = await axios.get("http://localhost:3000/api/v1/user/info", {
                //     headers: {
                //         Authorization: "Bearer " + localStorage.getItem("token"),
                //     },
                // });
                // setUsername(userResponse.data.username);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <Appbar />
            <div className="max-w-4xl mx-auto p-4 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Welcome back{username ? `, ${username}` : ""}</h1>
                        <p className="text-gray-500 mt-1">Manage your payments and transfers</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Button
                            label="Add Money"
                            variant="glass"
                            iconBefore={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                    </div>
                </div>
                
                {loading ? (
                    <div className="h-48 flex justify-center items-center">
                        <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
                    </div>
                ) : (
                    <>
                        <Balance value={balance} />
                        <Users />
                    </>
                )}
            </div>
        </div>
    );
};