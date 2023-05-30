import RestaurantCard from "./RestaurantCard";

function RestaurantTable({data=[]}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Type</th>
          <th>Price Starts From</th>
        </tr>
      </thead>
      <tbody>
      {data.map((ele)=>{
       return(
        <RestaurantCard key={ele.id} id={ele.id} name={ele.name} price_starts_from={ele.price_starts_from} type={ele.type} rating={ele.rating} />
       )
      })}
      </tbody>
    </table>
  );
}

export default RestaurantTable;
