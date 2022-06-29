import LoginButton from './LoginButton';

import { useAuth0 } from '@auth0/auth0-react';
import { NavBarMenu } from './NavBar/NavBarMenu';

const AuthenticationButton = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <NavBarMenu /> : <LoginButton />;
};

export default AuthenticationButton;