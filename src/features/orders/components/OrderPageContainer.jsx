import CreateOrderForm from "./CreateOrderForm";

export default function OrderPageContainer() {
    return (
        <>
            <div className="mt-32 z-10 h-[25rem] bg-gray-200 opacity-90  
            flex justify-center items-center flex-col rounded-2xl xl:h-[35rem]">
                <CreateOrderForm />
            </div>

        </>
    )
}