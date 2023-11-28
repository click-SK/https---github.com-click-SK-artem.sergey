import React from 'react';

const ClientFooter = ({calcTotalSumFunc, totalSum, wrapClass}) => {
    return (
        <div className="mirror_sum">
          <div>
            <button className="mirror_buttom" onClick={calcTotalSumFunc}>
              Підрахувати вартість
            </button>
          </div>
          <h3 className="order_sum mirror_sum">
            Кінцева вартість: <span>{totalSum ? totalSum.toFixed(0) : 0} грн</span>{" "}
          </h3>
        </div>
    );
};

export default ClientFooter;
