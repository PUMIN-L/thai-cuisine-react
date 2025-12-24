export default function Input({ type, placeholder, onChange, name, value, error, addClass }) {
    return (

        <div className="relative inline-block w-full mt-2">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                className={`w-full px-2 border-3 border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none p-1 rounded-md 
            ${error ? 'border-red-500 focus:border-red-500 focus:ring focus:ring-red-300' :
                        'border-gray-300  focus:ring focus:ring-blue-300'} ${addClass}`}
            />
            {<small className="text-red-500 absolute left-0 top-full">{error}</small>}
        </div>

    )
}