import { useEffect } from "react"
import { createPortal } from "react-dom"

export default function Modal({ onClose, open, children, title, bg, textColor }) {

    const bgMap = {
        gray900: 'bg-gray-900'
    }

    const textColorMap = {
        white: 'text-white'
    }

    useEffect(() => {
        const handlePressEsc = e => {
            if (e.keyCode === 27) {
                onClose?.()
            }
        }
        document.addEventListener('keydown', handlePressEsc)
        return () => document.removeEventListener('keydown', handlePressEsc)
    }, [onClose])

    return (<>
        {/* bg-gray-100 */}

        {open ? createPortal(<>
            <div className="fixed inset-0 bg-black opacity-95 min-h-screen "></div>
            <div
                className="fixed inset-0 flex justify-center items-center 
             rounded-lg z-30 min-h-screen  "
                onMouseDown={onClose}
            >
                <div className="bg-black opacity-100 rounded-2xl">
                    <div className={` p-8 rounded-2xl shadow-2xl bg-amber-50 ${bgMap[bg]}  opacity-100`}
                        onMouseDown={e => { e.stopPropagation() }}
                    >
                        <div className="flex justify-between min-w-3xs z-40 ">
                            <button className="invisible ">&#10005;</button>
                            <div className={`font-bold text-amber-700 text-lg ${textColorMap[textColor]}  `}>{title}</div>
                            <button
                                onClick={onClose}
                                style={{ cursor: 'pointer' }}
                                className="font-extrabold text-red-500 text-2xl ml-5"
                            >&#10005;</button>
                        </div>


                        <div className="z-40">{children}</div>
                    </div>
                </div>


            </div>

        </>, document.getElementById('modal')) : ""}

    </>)
}