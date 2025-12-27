import CreateOrderForm from "./CreateOrderForm";

export default function OrderPageContainer() {
    return (
        <>
            <div className="mt-40 z-10 h-full  opacity-90 
            flex justify-center items-center flex-col rounded-2xl xl:h-[30rem] lg:h-[30rem] ">
                <CreateOrderForm />
            </div>

        </>
    )
}