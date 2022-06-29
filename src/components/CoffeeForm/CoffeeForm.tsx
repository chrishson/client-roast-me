import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CoffeeFormProps {
    setCoffees: Function;
}

enum COFFEE_SIZES {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}

export function CoffeeForm({ setCoffees }: CoffeeFormProps) {
    const { getAccessTokenSilently } = useAuth0();
    const [coffeeSize, setCoffeSize] = useState(COFFEE_SIZES.MEDIUM);
    const [date, setDate] = useState(new Date());

    const getBackgroundColor = (test: COFFEE_SIZES) => {
        return coffeeSize === test ? "limegreen" : undefined;
    }

    const handleClick = (coffeeSize: COFFEE_SIZES) => {
        setCoffeSize(coffeeSize);
    };

    const handleSubmit = () => {
        (async () => {
            const data = {
                size: coffeeSize,
                consumption_date: date,
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
        <Box>
            <Box mb={5}>
                <DatePicker
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    selected={date} onChange={(date: Date) => setDate(date)} />
            </Box>
            <Button
                backgroundColor={getBackgroundColor(COFFEE_SIZES.SMALL)}
                onClick={() => handleClick(COFFEE_SIZES.SMALL)}
            >
                {COFFEE_SIZES.SMALL}
            </Button>
            <Button
                backgroundColor={getBackgroundColor(COFFEE_SIZES.MEDIUM)}
                onClick={() => handleClick(COFFEE_SIZES.MEDIUM)}
            >
                {COFFEE_SIZES.MEDIUM}
            </Button>
            <Button
                backgroundColor={getBackgroundColor(COFFEE_SIZES.LARGE)}
                onClick={() => handleClick(COFFEE_SIZES.LARGE)}
            >
                {COFFEE_SIZES.LARGE}
            </Button>
            <Button onClick={handleSubmit}>SUBMIT</Button>
        </Box>
    );
}
