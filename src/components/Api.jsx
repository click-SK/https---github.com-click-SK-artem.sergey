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
      "discount_percent": 11.5,
      "discount_amount": 9.99,
      "shipping_price": 2.5,
      "wrap_price": 3.5,
      "taxes": 2.5,
      "ordered_at": "2021-12-21 14:44:00",
      "buyer": {
        "full_name": "Test Kushnir",
        "email": "john.doe@mail.app",
        "phone": "+380635530117"
      }
    };
    
    const handleAddNewType = () => {    
      fetch('https://calc-shower.herokuapp.com/add-new-dashki-type', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
        .then((res) => res.json())
        setTimeout(() => {
          window.location.reload();
        },1000)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default OrderForm;