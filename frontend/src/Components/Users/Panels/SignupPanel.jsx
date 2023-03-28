import React,{useContext} from 'react'
import signUp_Img from '../../../Assets/images/signup_panel.svg'
import { SignUpModeContext } from '../../../Context/SignupModeContext';

function SignupPanel() {

  const { setSignUpState } = useContext(SignUpModeContext);

  return (
    <>
    <div className="panel right-panel">
          <div className="content-panel">
            <h3 style={{marginBottom:"5px"}}>One of us ?</h3>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p> */}
            <button onClick={() => setSignUpState(false)} className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src={signUp_Img} className="image" alt="" />
        </div>
    </>
  )
}

export default SignupPanel