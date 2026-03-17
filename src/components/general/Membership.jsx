import React from "react";

function Membership() {
  return (
    <>
      <div className="memberLounge">
        <div className="tierSep">
          <div className="rko">
            <h2 className="tierShow fontdiner-swanky-regular">Sapphire</h2>
            <img src="/images/bluSteelLogo.png" alt="" className="megallion" />
          </div>
          <div className="rko2">
            <p> Office Hour Open Access </p>
            <p>FrontEnd Maintainence</p>
            <p>Business Analytics</p>

            <h2 className="tierPrice fontdiner-swanky-regular">$50/monthly</h2>
          </div>
        </div>
        <div className="tierSep">
          <div className="rko">
            <h2 className="tierShow fontdiner-swanky-regular">Bullion</h2>
            <img
              src="/images/trophyGoldLogo.png"
              alt=""
              className="megallion"
            />
          </div>
          <div className="rko2">
            <p>Open Consultation Access</p>
            <p>Full Course Access</p>
            <p>Rebranding Package</p>
            <p></p>
            <h2 className="tierPrice fontdiner-swanky-regular">$250/monthly</h2>
          </div>
        </div>
        <div className="tierSep">
          <div className="rko">
            <h2 className="tierShow fontdiner-swanky-regular">Rose</h2>
            <img src="/images/rgLogo.png" alt="" className="megallion" />
          </div>
          <div className="rko2">
            <p>3 scheduled 1-on-1s</p>
            <p>Individual Course Access</p>
            <p>Branding Package Access</p>
            <h2 className="tierPrice fontdiner-swanky-regular">$100/monthly</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Membership;
