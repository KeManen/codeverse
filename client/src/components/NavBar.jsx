import { AppBar, Toolbar, Box, Button, ButtonGroup } from "@mui/material";
import { useSignOut, useIsAuthenticated } from "react-auth-kit";

export default function NavBar(props) {
    const singOut = useSignOut();
    const auth = useIsAuthenticated();
    console.log("auth"+auth())

    return <AppBar position="sticky">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <ButtonGroup>
                        <Button color="inherit" href="/">Home</Button>
                        <Button color="inherit" href="posts">Posts</Button>
                    </ButtonGroup>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <p>
                        {auth() ? "Logged In" : ""}
                    </p>
                    <ButtonGroup>
                        <Button color="inherit" href="/login">Login</Button>
                        <Button color="inherit" href="/register">Register</Button>
                        <Button color="inherit" onClick={() => singOut()}>Sign Out</Button>
                    </ButtonGroup>
                </Box>
            </Toolbar>
        </AppBar>
}

