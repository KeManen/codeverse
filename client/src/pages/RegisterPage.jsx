import {Button, FormControl, Card, TextField, CardHeader, CardContent} from "@mui/material";

///
/// This component is used to display a register page. It also handles the register.
///
export default function Register() {
    const submit = (e) => {
        e.preventDefault()
        const data = {
            "email": e.target.email.value,
            "username": e.target.name.value,
            "password": e.target.password.value
        }
        console.log(data)

        fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            mode: "cors",
        }).then((data) => {
            
        }).catch(console.error);
    };

    return <Card>
            <CardHeader>REGISTER</CardHeader>
            <p id="registerText">Register</p>
            <CardContent>
                <form onSubmit={submit}>
                    <FormControl>
                        <TextField required={true} type="email" id="email" name="email" label="Email"/>
                        <TextField required={true} type="name" id="name" name="name" label="Username"/>
                        <TextField required={true} type="password" id="password" name="password" label="Password"/>
                        <Button variant="primary" type="submit">Register</Button>
                    </FormControl>
                </form>
            </CardContent>
        </Card>
}