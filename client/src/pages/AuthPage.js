import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import M from 'materialize-css';


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try{
            const data = await request("/api/auth/register", "POST", { ...form });
            setForm({
                email: "",
                password: ""
            });
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try{
            const data = await request("/api/auth/login", "POST", { ...form });
            setForm({
                email: "",
                password: ""
            });
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    return (
        <div className="row">
            {/* <h2>{`${form.email} ${form.email&&form.password?"-":""} ${form.password}`}</h2> */}
            <div className="col s6 offset-s3">
                <h1>URL Minifier</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Input email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                    value={form.email}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Input password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                    value={form.password}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Login
                        </button>
                        <button
                            className="btn grey darken-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}