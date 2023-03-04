'use client';
import { Navbar, Button, Link } from '@nextui-org/react';

function Navigationbar() {
    return <Navbar isBordered variant="sticky">
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
    </Navbar>
};

export default Navigationbar;