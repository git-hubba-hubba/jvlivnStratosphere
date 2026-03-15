import {React,useState }from 'react'
import Tvmodal from '../build/Tvmodal'
import Recruit from '../../pages/Recruit'
import SiteDev from '../../pages/SiteDev'
import CMS from '../../pages/CMS'
import AgenticD from '../../pages/AgenticD'
import MandP from '../../pages/MandP'

function MajorModelXP() {

    const [stepOne, setStepOne] = useState(false)
    const [stepTwo, setStepTwo] = useState(false)
    const [stepThree, setStepThree] = useState(false)
    const [stepFour, setStepFour] = useState(false)
    const [stepFive, setStepFive] = useState(false)
    const [stepSix, setStepSix] = useState(false)
  return (
    <>
    
    <div className="majorModelContainer">
    <p style={{fontSize:"18px"}}>After being recruited into the JVLIVN network, members complete their initial training and graduate into the next stage: securing real clients. Once a recruit brings in a business opportunity, JVLIVN moves into the Build Phase, where we help transform that opportunity into a fully developed digital solution. During this phase, members work alongside the JVLIVN framework to deliver professional-grade systems that help the recruited organization operate more effectively.
    </p>
        <div className="containerA">
            <Tvmodal name={"Recruitment Process"} title={"Recruitment Process"} width={"90%"} component={<Recruit/>} />
            
        </div>

        <div className="containerB">
            <div className="siteDev "><Tvmodal  name={"SD"} width={"33%"} component={<SiteDev/>} title={"Site Development"}/></div>
            <div className="cmsDev "><Tvmodal  name={"CMS"} width={"45%"} component={<CMS/>} title={"Content Management System Development"}/></div>
            <div className="agentDev "><Tvmodal  name={"AD"} width={"33%"} component={<AgenticD/>} title={"Agentic System Design"}/></div>
        </div>
        <p style={{color:'blue'}}>Cloud Service Provided that Encompasses Each Service</p>

        <div className="containerC">
        <Tvmodal name={"Maintenance Process"}width={"90%"} component={<MandP />} title={"Maintenance & Restructuring"} />
        </div>





    </div>
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default MajorModelXP