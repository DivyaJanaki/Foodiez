https://foodiezdv.herokuapp.com/location

https://foodiezdv.herokuapp.com/restaurants?city=1 //state_id

https://foodiezdv.herokuapp.com/mealType

https://foodiezdv.herokuapp.com/filter/1

restaurant details page: passing restaurant_id
https://foodiezdv.herokuapp.com/restaurant/12

https://foodiezdv.herokuapp.com/menu/2

https://foodiezdv.herokuapp.com/menuItem--------pass array[1,2,3] in return you get menu item,

https://foodiezdv.herokuapp.com/placeOrder

Fetch Menu items:
http://localhost:8122/cart?mealId=65,70

https://foodiezdv.herokuapp.com/orders---- get all orders

> Filter
>> Cuisine Filter >>>>>>>>>>>>>>>>>>Done
(Search on basis of mealtype and cuisine)(https://xomato.herokuapp.com/filter/1?cuisine=3)

>> cost Filter (https://xomato.herokuapp.com/filter/1?lcost=650&hcost=850)
(Search on basis of mealtype and cost)

>> sort filter(http://xomato.herokuapp.com/filter/1?lcost=500&hcost=2000&sortKey=-1)
(Price high to low and Low to High)

>> Cuisine + Cost(https://xomato.herokuapp.com/filter/1?lcost=500&hcost=1000&cuisine=2)
((Search on basis of mealtype and cuisine + cost)


> Post the order
(Insert order details in db)
(https://xomato.herokuapp.com/placeOrder)

/// update order with payment details
(https://xomato.herokuapp.com/updateStatus/1)
{
	"status":"Delivered",
	"date":"2021-08-19%2021:32:37.0",
	"bank_status":"TXN_SUCCESS",
	"bank":"Bharat%20Bank"
}



/// delete orders
(https://xomato.herokuapp.com/deletOrders)

Page5(Order Page)
> List all the order placed >>>>>>>>>>>>>>>>>>Done
(https://xomato.herokuapp.com/orders)