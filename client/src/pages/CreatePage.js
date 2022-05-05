import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import M from 'materialize-css';
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";


export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [link, setLink] = useState("");

    const linkChangeHandler = (e) => {
        setLink(e.target.value);
    }

    const pressHandler = async (e) => {
        if (e.key === "Enter") {
            try {
                const data = await request("/api/link/generate", "POST", { from: link }, {
                    Authorization: `Bearer ${ auth.token }`
                });

                history.push(`/detail/${ data.link._id }`);

            } catch(e) {}
        }
    }

    useEffect(() => {
        M.updateTextFields();
    }, []);

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
                <div className="input-field">
                    <input
                        placeholder="Input link"
                        id="link"
                        type="text"
                        name="link"
                        onChange={linkChangeHandler}
                        onKeyPress={pressHandler}
                        value={link}
                    />
                    <label htmlFor="link">Link</label>
                </div>
            </div>
        </div>
    )
}