import React,{useState, useEffect} from 'react';
import '../../style/LoginForm.scss';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem('isAdmin') === 'true';
        if(admin) {
            navigate('/edit/admin');
        }
    },[])

    const handleSubmit = () => {
        if(login == 'admin' && password == 'admin') {
            localStorage.setItem('isAdmin',true)
            navigate('/edit/admin');
        } else {
            localStorage.setItem('isAdmin',false)
        }
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit();
        }
    }

    return (
        <div className="login_wrap">
            <div className="login_block">
            <h2 className="login_title">Вхід для адміністрації</h2>
            <div className="input_wrap">
                <input type='text' 
                value={login} onChange={(e) => setLogin(e.target.value)}
                placeholder='Логін'/>
            </div>
            <div className="input_wrap">
                <input type='password' 
                value={password} onChange={(e) => setPassword(e.target.value)} 
                onKeyDown={handleKeyDown}
                placeholder='Пароль'/>
            </div>
            <div className="login_button_wrap">
                <button className="login_button" onClick={handleSubmit}>Увійти</button>
            </div>
        </div>
        </div>
    );
};

export default Login;