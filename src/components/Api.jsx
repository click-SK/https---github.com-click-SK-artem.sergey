import React, { useState } from "react";

function OrderForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


    const order = {
      "source_id": 10,
      "buyer_comment": "Тестове замовлення",
      "ordered_at": "2021-12-21 14:44:00",
      "buyer": {
        "full_name": "Test Kushnir",
        "email": "john.doe@mail.app",
        "phone": "+380635530117"
      },
      "products": [
        {
          "sku": "001-242",
          "price": 124.5,
          "quantity": 1,
          "name": "Iphone XS max 256gb",
          "comment": "Наклеїти плівку",
          "properties": [
            {
              "name": "Color",
              "value": "Gold"
            }
          ]
        }
      ],
    };
    const testCrm = async () => {
      const url = 'https://openapi.keycrm.app/v1/order';
      const correlationId = '3c1cdba9-75bf-4a63-920b-80ff07f142c0';
      const token = 'ODQ0MDA5YjE3ZmJhMGYwNzQxMTFlN2FmYmRlZjE0MzEwNDljYzM5OQ';
    
      const data = {
        "source_id": 10,
        "buyer_comment": "Тестове замовлення",
        "ordered_at": "2021-12-21 14:44:00",
        "buyer": {
          "full_name": "Test Kushnir",
          "email": "john.doe@mail.app",
          "phone": "+380635530117"
        },
        "products": [
          {
            "sku": "001-242",
            "price": 124.5,
            "quantity": 1,
            "name": "Iphone XS max 256gb",
            "comment": "Наклеїти плівку",
            "properties": [
              {
                "name": "Color",
                "value": "Gold"
              }
            ]
          }
        ],
      };
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Correlation-Id': correlationId,
            'Accept': 'application/json',
            'Pragma': 'no-cache'
          },
          body: JSON.stringify(data)
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error('Error:', error.message);
  
      }
      console.log("press order");
    };
    

  }
  return (
    <></>
  );
}

export default OrderForm;