export default function FormButton({ children, onClick, color }) {

    const textColor = {
        green: 'text-green-700',
        red: 'text-red-700',
        blue800: 'text-blue-800'
    }

    return (
        <button
            className={`hover:underline px-2.5 py-1.5 rounded-md text-blue-500 cursor-pointer ${textColor[color]}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}