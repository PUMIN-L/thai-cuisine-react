
const bgMap = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    darkBlue: 'bg-blue-900 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    gray: 'bg-gray-200 hover:bg-gray-300',
    yellow: 'bg-yellow-500 hover:bg-yellow-400',
    orange: 'bg-orange-400 hover:bg-orange-300',
    red: 'bg-red-500 hover:bg-red-600',
}

const textConorMap = {
    white: 'text-white',
    black: 'text-black'
}

const widthButtonMap = {
    full: 'w-full',
    40: 'w-40'
}

const heightButtonMap = {
    40: 'h-40',
    30: 'h-30',
    20: 'h-20',
    15: 'h-15',
}

const pxMap = {
    1: 'px-1',
    3: 'px-3'
}


export default function Button({ children, bg = "yellow", color = 'white', width, onClick, addClass = "", height, px = 3 }) {
    return (
        <>
            <button className={` py-1.5 bg-amber-300 
                ${bgMap[bg]} ${textConorMap[color]} rounded-md ${widthButtonMap[width]} active:scale-98 ${addClass} 
                ${heightButtonMap[height]} ${pxMap[px]} px-`}
                onClick={onClick}
                style={{ cursor: 'pointer' }}
            >
                {children}
            </button>
        </>
    )
}