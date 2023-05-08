import React, { useState } from "react";

function OrderForm() {

    const testCrm = async () => {
      const url = 'https://openapi.keycrm.app/v1/order';
      const correlationId = '3c1cdba9-75bf-4a63-920b-80ff07f142c0';
      const token = 'ODQ0MDA5YjE3ZmJhMGYwNzQxMTFlN2FmYmRlZjE0MzEwNDljYzM5OQ';
      
      const data = []

      // const data = {
      //   "source_id": 10,
      //   "buyer_comment": finishedShowerPdf.orderComent,
      //   "buyer": {
      //     "full_name": `${finishedShowerPdf.lastName} ${finishedShowerPdf.firstName} ${finishedShowerPdf.surname}`,
      //     "phone": finishedShowerPdf.numberPhone
      //   },
      //   "shipping": {
      //     "delivery_service_id": 1,
      //     "shipping_address_city": finishedShowerPdf.adress,
      //   },
      //   "products": [
      //     {
      //       "price": finishedShowerPdf.total,
      //       "quantity": 1,
      //       "name": finishedShowerPdf.type,
      //       "comment": `${finishedShowerPdf.minInstallationName} ${finishedShowerPdf.minInstallation}`,
      //       "properties": [
      //         {
      //           "name": finishedShowerPdf.currentProcessingStandartName,
      //           "value": finishedShowerPdf.currentProcessingStandartVal
      //         },
      //         {
      //           "name": finishedShowerPdf.currentProcessingСutoutName,
      //           "value": finishedShowerPdf.currentProcessingСutoutCount
      //         },
      //       ]
      //     }
      //   ],
      // };
    
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
    

  
  return (
    <button onClick={testCrm}>Оформити</button>
  );
}

export default OrderForm;