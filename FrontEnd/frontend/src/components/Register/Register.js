import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Register.scss';
import {  useState} from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {registerUser} from '../../services/userService'
const Register = () => {
    const history = useHistory();
    const [ Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [ShopName, setShopName] = useState("");
    const [ShopAddress, setShopAddress] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPass: true,
        isValidName: true,
        isValidAddress: true,
        isValidPhone: true,
        isValidShopName: true,
        isValidShopAddress: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

   

    const isValidInput = () => {
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

        if( Password.length < 8 ){
            toast.error('Password must have more than 8 characters');
            setObjCheckInput({...defaultValidInput , isValidPass: false});
            return false;
        }

        if(!Name){
            toast.error('Name is required');
            setObjCheckInput({...defaultValidInput , isValidName: false});
            return false;
        }
        if(!Address){
            toast.error('Address is required');
            setObjCheckInput({...defaultValidInput , isValidAddress: false});
            return false;
        }
        if(!Phone){
            toast.error('Phone is required');
            setObjCheckInput({...defaultValidInput , isValidPhone: false});
            return false;
        }
        if(!ShopName){
            toast.error('ShopName is required');
            setObjCheckInput({...defaultValidInput , isValidShopName: false});
            return false;
        }
        if(!ShopAddress){
            toast.error('ShopAddress is required');
            setObjCheckInput({...defaultValidInput , isValidShopAddress: false});
            return false;
        }

        return true;
    }

    const handleRegister = async () => {
        let check =  isValidInput();
        if( check === true ){
            console.log(Email, Password, Name, Address, Phone, ShopName, ShopAddress)
            let response =  await registerUser(Email, Password, Name, Address, Phone, ShopName, ShopAddress);
            console.log('Responese >>>>>>> ', response)
            if(response && response.Success === true){
                history.push('/login');
            } 

            if( response && response.Success === false){
                toast.error(response.Mess);
            }
        }
    } 

    return (
        <div className="register-container">
            <div className="container mt-4">
                <div className="row">
                    <h2 className="text-center">Sign Up</h2>
                    <div className="form-register">
                            <div className="mb-3">
                                <input type="email" className={objCheckInput.isValidEmail ? 'form-control' :'form-control is-invalid'} id="email" aria-describedby="emailHelp" placeholder="Email" required
                                    value={Email} onChange={( event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="password" className={objCheckInput.isValidPass ? 'form-control' :'form-control is-invalid'} id="exampleInputPassword1" placeholder="Password" required
                                    value={Password} onChange={( event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className={objCheckInput.isValidName ? 'form-control' :'form-control is-invalid'} id="Name" placeholder="Name" required
                                    value={Name} onChange={( event) => setName(event.target.value)}    
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className={objCheckInput.isValidAddress ? 'form-control' :'form-control is-invalid'} id="Address" placeholder="Address" required
                                    value={Address} onChange={( event) => setAddress(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className={objCheckInput.isValidPhone ? 'form-control' :'form-control is-invalid'} id="Phone" placeholder="Phone" required
                                    value={Phone} onChange={( event) => setPhone(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className={objCheckInput.isValidShopName ? 'form-control' :'form-control is-invalid'} id="ShopName" placeholder="ShopName" required
                                    value={ShopName} onChange={( event) => setShopName(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className={objCheckInput.isValidShopAddress ? 'form-control' :'form-control is-invalid'} id="ShopAddress" placeholder="ShopAddress" required
                                    value={ShopAddress} onChange={( event) => setShopAddress(event.target.value)}
                                />
                            </div>
                            
                            <div className="mb-3 text-center">
                                <button  type="submit"  className="btn btn-success" onClick={()=>handleRegister()}>Sign Up</button>
                            </div>
                    </div>
                    <div className="back">
                        <NavLink className="text-decoration-none" to="/login">Back to login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register