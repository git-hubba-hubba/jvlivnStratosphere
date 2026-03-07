import {React,useState }from 'react'
import Tvmodal from '../build/Tvmodal'

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
        <div className="containerA">
            <Tvmodal name={"Recruitment Process"}width={"90%"} />
        </div>

        <div className="containerB">
            <div className="siteDev "><Tvmodal  name={"SD"} width={"33%"}/></div>
            <div className="cmsDev "><Tvmodal  name={"CMS"} width={"45%"}/></div>
            <div className="agentDev "><Tvmodal  name={"AD"} width={"33%"}/></div>
        </div>
        <p style={{color:'blue'}}>Cloud Service Provided that Encompasses Each Service</p>

        <div className="containerC">
        <Tvmodal name={"Maintenance Process"}width={"90%"} />
        </div>





    </div>
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default MajorModelXP