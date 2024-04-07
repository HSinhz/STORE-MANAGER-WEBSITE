import './Login.scss';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState, useContext} from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { loginUser} from '../../services/userService'
import useCheckLogin from '../../utils/checkLogin';

const Login = (props) => {
    useCheckLogin();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const history = useHistory();
    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
    

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if(session){
            history.push('/')
        }

    }, []);


    const handlerLogin = async () => {
        setObjCheckInput(defaultValidInput);
        if( !Email ){
            toast.error('Email is required');
            setObjCheckInput({...defaultValidInput , isValidEmail: false});
            return false;
        }

        let regx = /\S+@\S+\.\S+/;
        if( !regx.test(Email)){
            toast.error('Please enter a valid email address');
            setObjCheckInput({...defaultValidInput , isValidEmail: false});
            return false;
        }

        if(!Password){
            toast.error('Password is required');
            setObjCheckInput({...defaultValidInput , isValidPass: false});
            return false;
        }

        let response =  await loginUser(Email, Password);
        console.log('Responese >>>>>>> ', response)
        if(response && response.Success === true){

            let AT = response.access_token;
            let RT = response.refresh_token;
            let data = {
                isAuthenticated: true,
                Token: {AT, RT}
            }
            console.log(">>>> Data Context: ", data);
            sessionStorage.setItem("account", JSON.stringify(data));
                
            history.push('/');
        } 

        if( response && response.Success === false){
            toast.error(response.Mess);
        }
    }
    // const {user} =   React.useContext(UserContext);
    // console.log('>>> Check User Login: ', user);
    
    return ( 
        <div className="login-container">
            <div className="container">
                <div className="row">
                    <div className="content-left col-8 mt-4">
                        <div className="brand">
                            <h1>HSINHZ</h1>
                        </div>
                        <div className="detail">
                            <h3>Hieu sinh is learning front-end</h3>
                        </div>
                    </div>
                    <div className="content-right col-4">
                        <div className="form-login mt-4">
                            <h2 className="mb-3 text-center">Login</h2>
                            
                                <div className="mb-3">
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" required
                                        value={Email} onChange={( event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required
                                        value={Password} onChange={( event) => setPassword(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Remember Account</label>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary " onClick={() => handlerLogin()}>Log in</button>
                                </div>
                            
                            <div className="mb-3 text-center ">
                                <a href="#" className="forgot-pass">Forgotten Password</a>
                            </div>
                            
                            <div className="mb-3 text-center btn-register">
                                <NavLink to="/register">Create New Account</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;