import CreateOrderForm from "./CreateOrderForm";

export default function OrderPageContainer() {
    return (
        <>
            <div className="mt-20 z-10 h-[25rem]  opacity-90  
            flex justify-center items-center flex-col rounded-2xl xl:h-[35rem] lg:bg-gray-200">
                <CreateOrderForm />
            </div>

        </>
    )
}