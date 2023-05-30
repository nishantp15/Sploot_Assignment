import { Link } from "react-router-dom";

export default function RestaurantCard({name,type, price_starts_from,rating, id}) {
  // console.log(name);
 
  function changeString(string){
    string = string.split('');
    for(let i=0; i<string.length; i++){
      if(string[i]==="_"){
        string[i]=" "
        string[i+1] = string[i+1].toUpperCase();
      }
      string[0] = string[0].toUpperCase();
    }
   return string.join("")
  }
  return (
    <tr data-testid="item">
      <td>
        <Link data-testid="name" to={`/restaurants/${id}`}>{name}</Link>
      </td>
      <td data-testid="rating">{rating}</td>
      <td data-testid="type">{changeString(type)}</td>
      <td data-testid="price">{price_starts_from}</td>
    </tr>
  );
}
