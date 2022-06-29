import { Icon } from "@chakra-ui/react";
import { BiCoffeeTogo } from 'react-icons/bi';


export function CoffeeCup(props: any) {
    return <Icon as={BiCoffeeTogo} _hover={{ cursor: 'pointer' }} {...props} />
}