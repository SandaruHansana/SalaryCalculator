import React from 'react';

const SalaryItem = ({ item, index, removeItem }) => (
  <div>
    <span>{item.description}: {item.amount}</span>
    <button onClick={() => removeItem(index)}>Remove</button>
  </div>
);

export default SalaryItem;
