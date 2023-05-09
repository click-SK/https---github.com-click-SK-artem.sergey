import React from 'react';

const ClientFooter = ({calcTotalSumFunc, totalSum}) => {
    return (
        <div className="footer_calc">
        <div className="mirror_sum">
          <div>
            <button className="mirror_buttom" onClick={calcTotalSumFunc}>
              Підрахувати вартість
            </button>
          </div>
          <h3 className="order_sum mirror_sum">
            Кінцева вартість: <span> {totalSum} грн</span>{" "}
          </h3>
        </div>
        <div className="send_order mirror_button">
          <button className="mirror_button_order">Оформити</button>
        </div>
      </div>
    );
};

export default ClientFooter;