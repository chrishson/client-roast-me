import { useAuth0 } from '@auth0/auth0-react';
import { MenuItem } from '@chakra-ui/react';

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <MenuItem
            onClick={() =>
                logout({
                    returnTo: window.location.origin,
                })
            }
        >
            Log Out
        </MenuItem>
    );
};

export default LogoutButton;