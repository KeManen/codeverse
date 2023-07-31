import { AppBar, Toolbar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useSignOut, useIsAuthenticated, useAuthUser } from "react-auth-kit";

export default function NavBar(props) {
    const singOut = useSignOut();
    const auth = useIsAuthenticated();
    const user = useAuthUser();

    if(auth()){
        return <AppBar position="sticky">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <ButtonGroup>
                        <Button color="inherit" href="/">Home</Button>
                        <Button color="inherit" href="posts">Posts</Button>
                    </ButtonGroup>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography>
                        {`Welcome ${user().username}`}
                    </Typography>
                    <ButtonGroup>
                        <Button color="inherit" onClick={() => singOut()}>Sign Out</Button>
                    </ButtonGroup>
                </Box>
            </Toolbar>
        </AppBar>
    } else {
        return <AppBar position="sticky">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <ButtonGroup>
                        <Button color="inherit" href="/">Home</Button>
                        <Button color="inherit" href="posts">Posts</Button>
                    </ButtonGroup>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <ButtonGroup>
                        <Button color="inherit" href="/login">Login</Button>
                        <Button color="inherit" href="/register">Register</Button>
                    </ButtonGroup>
                </Box>
            </Toolbar>
        </AppBar>
    }
}

