import { useAuth0 } from "@auth0/auth0-react";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { CoffeeCup } from "../../icons/CoffeeCup";

interface CoffeeFormProps {
    setCoffees: Function;
}

export enum COFFEE_SIZES {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}

export function CoffeeForm({ setCoffees }: CoffeeFormProps) {
    const { getAccessTokenSilently } = useAuth0();
    const [coffeeSize, setCoffeSize] = useState(COFFEE_SIZES.MEDIUM);

    const getBackgroundColor = (size: COFFEE_SIZES) => {
        return coffeeSize === size ? "limegreen" : undefined;
    }

    const handleClick = (coffeeSize: COFFEE_SIZES) => {
        setCoffeSize(coffeeSize);
    };

    const handleSubmit = () => {
        (async () => {
            const data = {
                size: coffeeSize,
                consumption_date: new Date(),
            };

            try {
                const token = await getAccessTokenSilently();
                const response = await fetch(
                    "http://localhost:3010/api/coffees",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );
                setCoffees(await response.json());
            } catch (e) {
                console.error(e);
            }
        })();
    };

    return (
        <VStack>
            <HStack>
                <CoffeeCup
                    boxSize={'100px'}
                    onClick={() => { handleClick(COFFEE_SIZES.SMALL) }}
                    color={getBackgroundColor(COFFEE_SIZES.SMALL)}
                />
                <CoffeeCup
                    boxSize={'120px'}
                    onClick={() => { handleClick(COFFEE_SIZES.MEDIUM) }}
                    color={getBackgroundColor(COFFEE_SIZES.MEDIUM)}
                />
                <CoffeeCup
                    boxSize={'140px'}
                    onClick={() => { handleClick(COFFEE_SIZES.LARGE) }}
                    color={getBackgroundColor(COFFEE_SIZES.LARGE)}
                />
            </HStack>
            <Button onClick={handleSubmit}>SUBMIT</Button>
        </VStack>
    );
}
