import React, {useState} from "react";

const SelectObjecTemplateAndPhoto = ({
  title,
  changeFunc,
  state,
  data,
  wrapClass,
  optionName,
  selectWrapClass,
  selectDivWrap,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log('data',data);
  return (
    <>
      {selectDivWrap ? (
        // <div className={wrapClass}>
        //   <h3>{title}</h3>
        //   <div className={selectWrapClass}>
        //     <select
        //       onChange={changeFunc}
        //       value={state ? JSON.stringify(state) : ""}
        //     >
        //       <option value="" disabled>
        //         {optionName}
        //       </option>
        //       {data &&
        //         data.map((item) => (
        //           <option key={item._id} value={JSON.stringify(item)}>
        //             {item.name}
        //           </option>
        //         ))}
        //     </select>
        //   </div>
        // </div>
        <div 
        className="wrap_item"
        style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
            <h3>{title}</h3>
          <div
            className="custom-select"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            {state && (state?.name || ' ' )}
            {isOpen && (
              <div className="options">
                {data &&
                  data.map((item) => (
                    <div
                      style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        padding: "10px 0px",
                      }}
                      onClick={() => changeFunc(item)}
                      key={item._id}
                    >
                      <div className="img_shower_wrap_admin">
                        <img src={(item.mirrorsImage || item.showerImage)} />
                      </div>
                      <p>{item.name}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // <div className={wrapClass}>
        //   <h3>{title}</h3>
        //   <select
        //     onChange={changeFunc}
        //     value={state ? JSON.stringify(state) : ""}
        //   >
        //     <option value="" disabled>
        //       {optionName}
        //     </option>
        //     {data &&
        //       data.map((item, idx) => (
        //         <option key={item._id} value={JSON.stringify(item)}>
        //           {item.name}
        //         </option>
        //       ))}
        //   </select>
        // </div>
        <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
        <h3>{title}</h3>
      <div
        className="custom-select"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {state && (state?.name || ' ' )}
        {isOpen && (
          <div className="options">
            {data &&
              data.map((item) => (
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    padding: "10px 0px",
                  }}
                  onClick={() => changeFunc(item)}
                  key={item._id}
                >
                  <div className="img_shower_wrap_admin">
                    <img src={item.mirrorsImage} />
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
      )}
    </>
  );
};

export default SelectObjecTemplateAndPhoto;
