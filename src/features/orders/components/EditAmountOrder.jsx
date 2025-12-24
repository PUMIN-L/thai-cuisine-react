import { Minus, PlusIcon } from "../../../icons";

export default function EditAmountOrder({ amount, setAmount }) {

    return (<>
        <div className="cursor-pointer flex justify-center items-center gap-2">
            <div
                className="w-5 h-5 text-red-500 flex justify-center items-center"
                onClick={() => setAmount(prev => Math.max(0, prev - 1))}
            >
                <Minus />
            </div>

            <input
                type="number"
                className="w-12 text-center border-2 rounded no-spinner"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
            />

            <div
                className="w-5 text-green-600 flex justify-center items-center "
                onClick={() => setAmount(amount + 1)}
            >
                <PlusIcon />
            </div>

        </div>
    </>)
}