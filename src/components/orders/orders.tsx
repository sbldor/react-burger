import style from "./orders.module.css";
import FeedItem from "../feed-item/feed-item";
import PropTypes from "prop-types";

const Orders = ({feed}) => {
   
   return (
      <>
         {feed.map(order => (
            <FeedItem feed={order} key={order._id}/>
         ))}
      </>
      )
}

Orders.propTypes = {
   feed: PropTypes.array.isRequired,
};

export default Orders