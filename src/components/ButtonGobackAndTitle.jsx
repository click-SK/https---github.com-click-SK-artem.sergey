import React from 'react';
import {BsArrow90DegLeft} from 'react-icons/bs'
import '../style/buttonGobackAndTitle.scss'
const ButtonGobackAndTitle = ({title}) => {
    const goBack = () => {
        window.history.back();
      };
    return (
      <div className='wrapper'>
        <div className='wrapper_button'>
        <button 
        onClick={goBack}
        className='button_go_back header_item active_tab'>
          <BsArrow90DegLeft/>
          <p>Назад</p>
        </button>
        </div>
        <div className='wrapper_title'>
        <h1>{title}</h1>
        </div>
      </div>
    );
};

export default ButtonGobackAndTitle;