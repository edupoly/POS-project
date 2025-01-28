import React from 'react'

function Restaurants(props) {
    const [restaurants,setrestaurants] = React.useState([])
    React.useEffect(()=>{
        //send request to backend server for food items
        fetch('http://localhost:4000/foodItems',{
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
      })
        .then(res=>res.json())
        .then(data=>{
          
          if(data.err){
            window.localStorage.clear();
            props.setIsLoggedIn(false);
          }
          else{
            console.log(data)
            setrestaurants(data)
          }
        })
    },[])
  return (
    <div>
      Restaurants
      {
        restaurants && restaurants.map((r)=>{
          return (
            <li className='list-unstyled border m-3 p-3'>
              <h3>{r.restaurant}</h3>
              <ul className='d-flex flex-wrap '>
                {
                  r.foodItems.map((foodItem)=>{
                    return(
                      <li className='w-25 list-unstyled border p-3'>
                        <h6>{foodItem.foodName}</h6>
                        <u>{foodItem.calories}</u>
                      </li>
                    )
                  })
                }
              </ul>
            </li>
          )
        })
      }
    </div>
  )
}

export default Restaurants