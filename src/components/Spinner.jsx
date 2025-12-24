
import { LoaderIcon } from "../icons";



export default function Spinner({ transparent }) {
    return (
        <>
            <div className={`fixed inset-0 z-50 bg-white ${transparent ? 'opacity-70' : ''}`}></div>
            <div className="fixed inset-0 flex justify-center items-center z-50 animate-spin">
                <LoaderIcon className={'fill-blue-600'} />
            </div>
        </>

    )
}