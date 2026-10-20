import React from "react";
import { Link } from "react-router-dom";
import { useRewards, savePlan } from "../gamification/store";
import { stats } from "../gamification/rules";
import "../gamification/rewards.css";

function PlanControls({name, children}) {
  const {profile} = useRewards();
  const selected = profile.plan === name;
  return <div className="gm-plan-control">
    <details><summary>Explore {name} benefits</summary><p>{children}</p></details>
    <button className="gm-plan-button" aria-pressed={selected} onClick={() => savePlan(name)}>{selected ? "✓ Preferred plan" : `Save ${name} preference`}</button>
    <small>{selected ? "Preference saved on this device. No subscription activated." : "Save your interest. No purchase or charge."}</small>
  </div>;
}

function Membership() {
  const {profile} = useRewards();
  const {rank, xp} = stats(profile);
  return (
    <>
      <p className="gm-plan-status">Learning tier: <strong>{rank.name}</strong> · {xp} XP · {profile.plan ? `${profile.plan} plan preferred` : "Explore a membership below"} · <Link to="/lib?tab=progress">View achievements →</Link></p>
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

            <p style={{color:"peru"}} className="tierPrice fontdiner-swanky-regular">$50/monthly</p>
            <PlanControls name="Sapphire">For ongoing support: open office hours, frontend maintenance, and business analytics. Explore the learning dashboard while you consider your support needs.</PlanControls>
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
            <p style={{color:"peru"}} className="tierPrice fontdiner-swanky-regular">$250/monthly</p>
            <PlanControls name="Bullion">For broader business support: open consultations, full course access, and a rebranding package. Compare the scope with your current goals before arranging membership.</PlanControls>
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
            <p style={{color:"peru"}} className="tierPrice fontdiner-swanky-regular">$100/monthly</p>
            <PlanControls name="Rose">For focused guidance: three scheduled one-on-one sessions, individual course access, and branding package access. Consider which topics you want to work through with a mentor.</PlanControls>
          </div>
        </div>
      </div>
    </>
  );
}

export default Membership;
