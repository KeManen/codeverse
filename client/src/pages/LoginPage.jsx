import {Button, FormControl,  CardContent, Card, TextField, CardHeader} from "@mui/material";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

//Login page
export default function Login() {
    const signIn =  useSignIn();
    const navigate = useNavigate();

    //Submit login data to the backend to be validated from the database
    const submit = (e) => {
        e.preventDefault()
        const data = {
            "email": e.target.email.value,
            "password": e.target.password.value,
        };
        console.log(data);

        fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            mode: "cors"
        }).then(response => response.json())
        .then((data) => {
            if (data.token){
                console.log(data)
                signIn({
                    token: data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState : {"data":data}
                });
                console.log("logged in");
                navigate("/");
            } 
        }).catch(console.error)
    }

    return <Card>
            <CardHeader>LOGIN</CardHeader>
            <CardContent>
                <form onSubmit={submit}>
                    <FormControl>
                        <TextField required={true} type="email" id="email" name="email" label="Email:"/>
                        <TextField required={true} type="password" id="password" name="password" label="Password"/>
                        <Button variant="primary" type="submit">Login</Button>
                    </FormControl>
                </form>
            </CardContent>
        </Card>
}