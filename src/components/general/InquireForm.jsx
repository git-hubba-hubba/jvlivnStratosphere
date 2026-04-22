import React from "react";

function InquireForm() {
  return (
    <>
      <div className="formHandler">
        <div className="flexup">
          <h2 className="fontdiner-swanky-regular">We Want 2 Hear From You</h2>
          <img
            src="https://img.freepik.com/premium-photo/young-african-american-woman-blue-wall-raising-fist-after-victory_1187-73281.jpg"
            alt=""
            className="formShowPic"
          />
        </div>
        <div className="formProtect">
          <h2 style={{fontSize:'16px'}}className="fontdiner-swanky-regular">Looking to Promo A New Event? </h2>
          <form action="">
            <input type="text" placeholder="Enter Name " className="ef_fm" />
            <input type="text" placeholder="Enter Name " className="ef_fm" /><br />
            <input type="text" placeholder="Enter Name " className="ef_fm" />
            <input type="text" placeholder="Enter Name " className="ef_fm" /><br />
            {/* <textarea name="" id=""></textarea> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default InquireForm;
