import React from 'react'
import { Link } from 'react-router-dom';
import {arrow} from "../assets/icons"

const InfoBox = ({text, link, btnText}) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
            {text}
        </p>

        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain' />
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi, I am <span className='font-semibold'>Adam</span> 👋
            <br />
            A bee from Fortinest
        </h1>
    ),
    2: (
        <InfoBox
            text="This is a mock up of MK World which bee will create from scratch with better models etc."
            link="/about"
            btnText="Learn More"
        />
    ),
    3: (
        <InfoBox
            text="Here are some projects I've worked on over the years"
            link="/projects"
            btnText="Visit my portfolio"
            />
    ),
    4: (
        <InfoBox
            text="Need to rent a bug (i am a honey bee)"
            link="/contact"
            btnText="Let's buzz!"
        />
    )
}



const HomeInfo = ({currentStage}) => {
  return renderContent[currentStage] ||  null;
}

export default HomeInfo