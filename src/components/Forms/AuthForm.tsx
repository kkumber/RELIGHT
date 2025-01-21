import { useEffect, useState, useContext } from "react";
import Loading from "../Loading";
import ErrorMsg from "../ErrorMsg";
import { useNavigate } from "react-router-dom";
import useAuthFetch from "../../hooks/useAuthFetch";


interface Prop {
    action: string
}

const AuthForm = ({action}: Prop) => {
    const {data, isLoading, error, getToken, registerUser} = useAuthFetch();

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    });

    const name = action === 'Login' ? "Login" : null;


    const handleChangeLoginData = (e: any) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleChangeRegisterData = (e: any) => {
        const {name, value} = e.target;

        setRegisterData({
            ...registerData,
            [name]: value,
        });
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (loginData.username !== '' && loginData.password !== '') {
            await getToken(loginData);
            navigate('/');
        }
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();
        await registerUser(registerData);
        navigate('/login');

    };


    return (
        <>
            {isLoading && <Loading />}
            {error && <ErrorMsg error={error} />}
    
            {name ? (
                <form onSubmit={handleLogin}>
                    <h2>{action}</h2>
                    <label htmlFor="username">Enter Username: </label> <br />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required={true}
                        value={loginData.username}
                        onChange={handleChangeLoginData}
                    /> <br />
                    <label htmlFor="password">Enter Password: </label> <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required={true}
                        value={loginData.password}
                        onChange={handleChangeLoginData}
                    /> <br />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <form onSubmit={handleRegister}>
                    <h2>{action}</h2>
                    <label htmlFor="username">Enter Username: </label> <br />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required={true}
                        value={registerData.username}
                        onChange={handleChangeRegisterData}
                    /> <br />
                    <label htmlFor="email">Enter Email: </label> <br />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={registerData.email}
                        onChange={handleChangeRegisterData}
                    /> <br />
                    <label htmlFor="password1">Enter Password: </label> <br />
                    <input
                        type="password"
                        name="password1"
                        placeholder="Password"
                        required={true}
                        value={registerData.password1}
                        onChange={handleChangeRegisterData}
                    /> <br />
                    <label htmlFor="password2">Confirm Password: </label> <br />
                    <input
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                        required={true}
                        value={registerData.password2}
                        onChange={handleChangeRegisterData}
                    /> <br />
                    <button type="submit">Register</button>
                </form>
            )}
        </>
    );
}

export default AuthForm;