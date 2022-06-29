import { useAuth0 } from "@auth0/auth0-react";
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsGear } from 'react-icons/bs';
import LogoutButton from "../LogoutButton";

export function NavBarMenu() {
    const { user } = useAuth0();
    return <Box w={'100%'} display={'flex'} justifyContent={'space-between'}>
        <Box>
            {`Logged in as ${user?.name} `}
        </Box>
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<BsGear />}
                variant='outline'
            />
            <MenuList>
                <LogoutButton />
            </MenuList>
        </Menu>
    </Box>

}