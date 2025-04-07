// export const Balance = ({ value }) => {
//     return (
//         <div className="flex">
//             <div className="font-bold text-lg">Your Balance</div>
//             <div className="font-semibold ml-4">Rs {value}</div>
//         </div>
//     );
// };

export const Balance = ({ value }) => {
    return (
        <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100 rounded-xl p-6 shadow-lg transform hover:scale-[1.01] transition-all duration-300 border border-indigo-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="text-indigo-900 font-bold text-lg">Available Balance</div>
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mt-2 md:mt-0">
                    ₹ {value.toLocaleString()}
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-indigo-200">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-indigo-500 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        Last updated today
                    </div>
                    <div className="text-xs text-indigo-500 font-medium cursor-pointer hover:text-indigo-700">
                        View History
                    </div>
                </div>
            </div>
        </div>
    );
};