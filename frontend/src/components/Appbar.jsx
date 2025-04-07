// export const Appbar = () => {
//     return (
//         <div className="shadow h-14 flex justify-between">
//             <div className="flex flex-col justify-center h-full ml-4">
//                 PayTM App
//             </div>
//             <div className="flex">
//                 <div className="flex flex-col justify-center h-full mr-4">
//                     Hello
//                 </div>
//                 <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                     <div className="flex flex-col justify-center h-full text-xl">
//                         U
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

export const Appbar = () => {
    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-16 flex justify-between items-center px-6 relative z-10">
            <div className="flex items-center">
                <div className="text-white font-extrabold text-2xl tracking-tight">
                    <span className="text-yellow-300">Pay</span>
                    <span className="text-white">TM</span>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="hidden md:block text-white font-medium">Hello, User</div>
                <div className="h-10 w-10 bg-gradient-to-r from-pink-500 to-yellow-300 rounded-full p-0.5">
                    <div className="bg-white rounded-full h-full w-full flex justify-center items-center">
                        <span className="text-indigo-600 font-bold">U</span>
                    </div>
                </div>
            </div>
        </div>
    );
};