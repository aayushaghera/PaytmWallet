
// import { useEffect, useState } from "react";
// import { Button } from "./Button";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [filter, setFilter] = useState("");

//     useEffect(() => {
//         axios.get(`http://localhost:3000/api/v1/user/bulk${filter ? `?filter=${filter}` : ""}`)
//             .then(response => {
//                 setUsers(response.data.user);
//             })
//             .catch(error => console.error("Error fetching users:", error));
//     }, [filter]);

//     return <>
//         <div className="font-bold mt-6 text-lg">
//             Users
//         </div>
//         <div className="my-2">
//             <input
//                 onChange={(e) => setFilter(e.target.value)}
//                 type="text"
//                 placeholder="Search users..."
//                 className="w-full px-2 py-1 border rounded border-slate-200"
//             />
//         </div>
//         <div>
//             {users.map(user => <User key={user._id} user={user} />)}
//         </div>
//     </>
// }

// function User({ user }) {
//     const navigate = useNavigate();
//     return (
//         <div className="flex justify-between">
//             <div className="flex">
//                 <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                     <div className="flex flex-col justify-center h-full text-xl">
//                         {user.firstName[0]}
//                     </div>
//                 </div>
//                 <div className="flex flex-col justify-center h-full">
//                     <div>
//                         {user.firstName} {user.lastName}
//                     </div>
//                 </div>
//             </div>
//             <div className="flex flex-col justify-center h-full">
//                 <Button
//                     onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
//                     label="Send Money"
//                 />
//             </div>
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://paytmwallet-6aeq.onrender.com/api/v1/user/bulk${filter ? `?filter=${filter}` : ""}`)
            .then(response => {
                setUsers(response.data.user);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setLoading(false);
            });
    }, [filter]);

    return (
        <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
                <div className="font-bold text-xl text-gray-800 relative">
                    Users
                    <div className="absolute -bottom-1 left-0 h-1 w-8 bg-gradient-to-r from-pink-500 to-yellow-300 rounded-full"></div>
                </div>
                <div className="text-sm text-indigo-600 font-medium">
                    {users.length} users found
                </div>
            </div>
            
            <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
            </div>
            
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
                </div>
            ) : (
                <div className="space-y-3">
                    {users.length > 0 ? (
                        users.map(user => <User key={user._id} user={user} />)
                    ) : (
                        <div className="text-center py-10 text-gray-500">No users found</div>
                    )}
                </div>
            )}
        </div>
    )
}

function User({ user }) {
    const navigate = useNavigate();
    const getInitials = () => {
        return user.firstName[0] + (user.lastName ? user.lastName[0] : "");
    };
    
    const getBgGradient = () => {
        const gradients = [
            "from-purple-500 to-indigo-500",
            "from-pink-500 to-rose-500",
            "from-amber-500 to-orange-500",
            "from-teal-500 to-emerald-500",
            "from-blue-500 to-cyan-500",
        ];
        const hash = user.firstName.charCodeAt(0) % gradients.length;
        return gradients[hash];
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] border border-gray-100">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className={`rounded-xl h-12 w-12 bg-gradient-to-br ${getBgGradient()} flex justify-center items-center text-white font-bold mr-4`}>
                        {getInitials()}
                    </div>
                    <div>
                        <div className="font-medium text-gray-800">{user.firstName} {user.lastName}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{user.username || "No username"}</div>
                    </div>
                </div>
                <div className="w-28">
                    <Button
                        onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                        label="Send"
                        variant="primary"
                        iconAfter={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        }
                    />
                </div>
            </div>
        </div>
    );
}