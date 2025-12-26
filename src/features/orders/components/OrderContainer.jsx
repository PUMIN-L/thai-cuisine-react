
import ShotCutOrderCard from "./ShotcutOrderCard";


export default function OrderContainer({ orders }) {


    return (<div className="flex flex-col gap-2 max-h-[50rem]  ">
        {orders?.map(item => <ShotCutOrderCard
            key={item.id}
            order={item}
        />)}
    </div>)
}