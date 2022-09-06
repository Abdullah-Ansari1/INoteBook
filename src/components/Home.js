import React from 'react'

import Notes from './Notes';
import TextForm from './TextForm';
const Home = (props) => {
const {showAlert, mode}= props;
    return (
        <div style={{ marginTop: "140px"}}>
        
           <Notes showAlert={showAlert}/>
           <TextForm showAlert={showAlert} mode={mode}/>
        </div>
    )
}

export default Home
