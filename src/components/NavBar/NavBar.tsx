import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton';
import { NavBarMenu } from './NavBarMenu';

const NavBar = () => {
    const { isAuthenticated } = useAuth0();
    return isAuthenticated ? <NavBarMenu /> : <LoginButton />;
};

export default NavBar;