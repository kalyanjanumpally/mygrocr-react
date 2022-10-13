import React from "react";

const concludePurchaseCalc = (cartItems, price) => {

    console.log("Cart Items: " + JSON.stringify(cartItems))

    const totalQty = () => {
        var total = 0;
        //const totalq = cartItems.map((item)=> item)
        for (let x in cartItems) {
            total = total + cartItems[x].productQuantity;
        }
        return total;
    }

    const cartItemsUpdated = () => {
        const cartItemsUpdateTemp = {};
        const cartItemsUpdate = [];		
		let iter =0
		
        for (let x in cartItems) {			
            Object.assign(cartItemsUpdateTemp, {"orderProductId" : cartItems[x].productId, "quantity" : cartItems[x].productQuantity, 
			"unitPrice" : cartItems[x].productMrp, "imageUrl" : ""});
            cartItemsUpdate[iter] = cartItemsUpdateTemp;
			iter = iter +1;
			cartItemsUpdateTemp = {};
        }

        return cartItemsUpdate;
    }

    const cust = {
        "firstName": "Saylo",
        "lastName": "Karato",
        "email": "advocate.sayli.llm@gmail.in"
    };

    console.log("price: " + price);

    const ord = {
        "totalPrice": price,
        "totalQuantity": totalQty()
    };

    const purchase = {
        "customer": cust,
        "shippingAddress": {
            "street": "afasa",
            "city": "afasa",
            "state": "Alberta",
            "country": "Canada",
            "zipCode": "afasa"
        },
        "billingAddress": {
            "street": "fsfsf",
            "city": "sfdsf",
            "state": "Acre",
            "country": "Brazil",
            "zipCode": "19111"
        },
        "order": ord,

        "orderItems": cartItemsUpdated()
    }

    const url = "http://localhost:8083/api/checkout/purchase";

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchase)
    };

    const fetchData = async() => {
        try {
            const response = await fetch(url, requestOptions);
            const json = await response.json();

            console.log("response: " + JSON.stringify(json))

        } catch (error) {
            console.log("Error: ", error);
        }
    }
    fetchData()
}

export default concludePurchaseCalc;
