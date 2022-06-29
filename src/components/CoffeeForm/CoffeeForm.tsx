import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import "./CoffeeForm.css";

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
        <div>
            <button
                className={
                    coffeeSize === COFFEE_SIZES.SMALL
                        ? "button-active"
                        : undefined
                }
                onClick={() => handleClick(COFFEE_SIZES.SMALL)}
            >
                {COFFEE_SIZES.SMALL}
            </button>
            <button
                className={
                    coffeeSize === COFFEE_SIZES.MEDIUM
                        ? "button-active"
                        : undefined
                }
                onClick={() => handleClick(COFFEE_SIZES.MEDIUM)}
            >
                {COFFEE_SIZES.MEDIUM}
            </button>
            <button
                className={
                    coffeeSize === COFFEE_SIZES.LARGE
                        ? "button-active"
                        : undefined
                }
                onClick={() => handleClick(COFFEE_SIZES.LARGE)}
            >
                {COFFEE_SIZES.LARGE}
            </button>
            <button onClick={handleSubmit}>SUBMIT</button>
        </div>
    );
}
