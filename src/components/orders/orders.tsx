import FeedItem from "../feed-item/feed-item";
import { FC } from "react";
import { TOrder } from "../../utils/types";

interface IOrders {
   feed: TOrder[]
}

const Orders: FC<IOrders> = ({feed}) => {
   
   return (
      <>
         {feed.map(order => (
            <FeedItem feed={order} key={order._id}/>
         ))}
      </>
      )
}

export default Orders