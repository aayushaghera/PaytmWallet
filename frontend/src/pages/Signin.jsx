// import { useState } from "react";
// import { BottomWarning } from "../components/BottomWarning";
// import { Button } from "../components/Button";
// import { Heading } from "../components/Heading";
// import { InputBox } from "../components/InputBox";
// import { SubHeading } from "../components/SubHeading";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const Signin = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleSignin = async () => {
//         if (!username || !password) {
//             alert("Please fill in both fields.");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
//                 username,
//                 password
//             });
//             localStorage.setItem("token", response.data.token);
//             navigate("/dashboard");
//         } catch (error) {
//             console.error("Signin error:", error);
//             alert("Signin failed. Please check your credentials and try again.");
//         }
//     };

//     return (
//         <div className="bg-slate-300 h-screen flex justify-center">
//             <div className="flex flex-col justify-center">
//                 <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//                     <Heading label={"Sign in"} />
//                     <SubHeading label={"Enter your credentials to access your account"} />
//                     <InputBox 
//                         onChange={e => setUsername(e.target.value)} 
//                         placeholder="07capsual@gmail.com" 
//                         label={"Email"} 
//                     />
//                     <InputBox 
//                         onChange={e => setPassword(e.target.value)} 
//                         placeholder="aayush123" 
//                         label={"Password"} 
//                     />
//                     <div className="pt-4">
//                         <Button onClick={handleSignin} label={"Sign in"} />
//                     </div>
//                     <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
//                 </div>
//             </div>
//         </div>
//     );
// };

import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        if (!username || !password) {
            setError("Please fill in both fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("https://paytmwallet-6aeq.onrender.com/api/v1/user/signin", {
                username,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Signin error:", error);
            setError(error.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 flex justify-center items-center p-6">
            <div className="relative max-w-md w-full">
                <div className="absolute top-0 right-0 w-60 h-60 bg-yellow-300/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
                
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden p-8 relative">
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-yellow-300/10 to-orange-400/10 rounded-full blur-xl"></div>
                    <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-full blur-xl"></div>
                    
                    <div className="text-center relative z-10">
                        <div className="mb-2 flex justify-center">
                            <div className="text-4xl font-bold text-white mb-2">
                                <span className="text-yellow-300">Pay</span>TM
                            </div>
                        </div>
                        <Heading label="Welcome Back" />
                        <SubHeading label="Enter your credentials to access your account" />
                    </div>
                    
                    <div className="mt-6 relative z-10">
                        <InputBox 
                            onChange={e => setUsername(e.target.value)} 
                            value={username}
                            placeholder="aayushaghera@gmail.com" 
                            label="Email" 
                        />
                        <InputBox 
                            onChange={e => setPassword(e.target.value)} 
                            value={password}
                            type="password"
                            placeholder="••••••••" 
                            label="Password" 
                        />
                        
                        {error && <div className="text-red-300 text-sm mb-4">{error}</div>}
                        
                        <div className="mt-8">
                            <Button 
                                onClick={handleSignin} 
                                label={loading ? "Signing in..." : "Sign in"} 
                                disabled={loading}
                            />
                        </div>
                        
                        <BottomWarning 
                            label="Don't have an account?" 
                            buttonText="Sign up" 
                            to="/signup" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
