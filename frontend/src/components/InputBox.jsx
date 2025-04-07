// export function InputBox({label,placeholder, onChange}){
//     return <div>
//         <div className="text-sm font-medium text-left py-2">
//             {label}
//         </div>
//         <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200 " />
//     </div>
// }



export function InputBox({ label, placeholder, onChange, type = "text", value }) {
    return (
        <div className="mb-5 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label}
            </label>
            <div className="relative">
                <input 
                    value={value}
                    onChange={onChange} 
                    type={type}
                    placeholder={placeholder} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm" 
                />
                <div className="absolute inset-0 rounded-xl border border-indigo-300 border-opacity-0 pointer-events-none transition-all duration-300 group-focus:border-opacity-100"></div>
            </div>
        </div>
    )
}