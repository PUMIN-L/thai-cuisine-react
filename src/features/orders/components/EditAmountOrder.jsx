import { Minus, PlusIcon } from "../../../icons";

export default function EditAmountOrder({ amount, setAmount }) {

    return (<>
        <div className="cursor-pointer flex justify-center items-center gap-2 absolute top-10 left-44 
        lg:relative lg:top-0 lg:left-0">
            <div
                className="w-3 h-3 text-red-500 flex justify-center items-center
                lg:w-5 lg:h-5"
                onClick={() => setAmount(prev => Math.max(0, prev - 1))}
            >
                <Minus />
            </div>

            <input
                type="number"
                className="w-8 text-center border-2 rounded no-spinner lg:w-12"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
            />

            <div
                className="w-3 text-green-600 flex justify-center items-center lg:w-5"
                onClick={() => setAmount(amount + 1)}
            >
                <PlusIcon />
            </div>

        </div>
    </>)
}