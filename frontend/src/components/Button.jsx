// export function Button({label, onClick}) {
//     return <button onClick={onClick} type="button" className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
// }

export function Button({ label, onClick, variant = "primary", disabled = false, iconBefore, iconAfter }) {
    const baseClasses = "w-full py-3 px-5 rounded-xl font-medium text-sm transition-all duration-300 focus:outline-none relative overflow-hidden";
    
    const variantClasses = {
        primary: `bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`,
        secondary: `bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`,
        success: `bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md hover:shadow-lg hover:from-green-600 hover:to-emerald-600 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`,
        glass: `backdrop-filter backdrop-blur-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white shadow-md hover:bg-opacity-30 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`
    };
    
    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            type="button" 
            className={`${baseClasses} ${variantClasses[variant]} group`}
        >
            <div className="flex items-center justify-center">
                {iconBefore && <span className="mr-2">{iconBefore}</span>}
                {label}
                {iconAfter && <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">{iconAfter}</span>}
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </button>
    )
}