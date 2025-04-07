// export function Heading({label})
// {
//     return <div className="font-bold text-4xl pt-6">
//          {label}
//     </div>
// }

export function Heading({ label }) {
    return (
        <div className="relative pt-6 pb-2">
            <h1 className="font-extrabold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {label}
            </h1>
            <div className="absolute bottom-0 left-0 h-1 w-12 bg-gradient-to-r from-yellow-300 to-pink-500 rounded-full"></div>
        </div>
    )
}