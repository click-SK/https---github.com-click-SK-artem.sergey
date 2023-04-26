import React, { useState } from "react";

function Api() {
    const [formData, setFormData] = useState({
        type: "",
        page: "",
        website: "",
        phone: "",
        amount: "",
      });
      
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:4444/api/v1/core/preview-courses";
        
    
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    

  return (
    <form className="form_api" onSubmit={handleSubmit}>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </label>
      <label>
        Page:
        <input
          type="text"
          name="page"
          value={formData.page}
          onChange={handleChange}
        />
      </label>
      <label>
        Website:
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </label>
      <label>
        Amount:
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}



export default Api;