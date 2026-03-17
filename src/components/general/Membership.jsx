import React from 'react'

function Membership() {
  return (
    <>
        <div className="memberLounge">
        <div className="tierSep">
            <h2 className="tierShow fontdiner-swanky-regular">Sapphire</h2>
            <img src="/images/bluSteelLogo.png" alt="" className="megallion" />
            <p> Office Hour Open Access </p>
            <p>FrontEnd Maintainence</p>
            <p>Business Analytics</p>
            
            <h2 className="tierPrice fontdiner-swanky-regular">$50/monthly</h2>
        </div>
        <div className="tierSep">
        <h2 className="tierShow fontdiner-swanky-regular">Bullion</h2>
            <img src="/images/trophyGoldLogo.png" alt="" className="megallion" />
            <p>Open Consultation Access</p>
            <p>Full Course Access</p>
            <p>Rebranding Package</p>
            <p></p>
            <h2 className="tierPrice fontdiner-swanky-regular">$250/monthly</h2>
        </div>
        <div className="tierSep">
        <h2 className="tierShow fontdiner-swanky-regular">Rose</h2>
            <img src="/images/rgLogo.png" alt="" className="megallion" />
            <p>3 scheduled 1-on-1s</p>
            <p>Individual Course Access</p>
            <p>Branding Package Access</p>
            <h2 className="tierPrice fontdiner-swanky-regular">$100/monthly</h2>
        </div>


        </div>
    
    
    
    
    
    </>
  )
}

export default Membership