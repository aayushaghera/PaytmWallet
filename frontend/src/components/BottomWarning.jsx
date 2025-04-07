// import {Link} from "react-router-dom"

// export function BottomWarning({label,buttonText,to})
// {
//     return <div>
//         <div>
//             {label}
//         </div>
//         <Link className="pointer underline pl-1 cursor-pointer" to={to}>
//           {buttonText}
//         </Link>
//     </div>
// }

import { Link } from "react-router-dom"

export function BottomWarning({ label, buttonText, to }) {
    return (
        <div className="flex justify-center items-center mt-8 text-sm">
            <div className="text-gray-600">
                {label}
            </div>
            <Link 
                className="ml-1.5 text-indigo-600 font-medium hover:text-indigo-800 relative group" 
                to={to}
            >
                {buttonText}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
        </div>
    )
}