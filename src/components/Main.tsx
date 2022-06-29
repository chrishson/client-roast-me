import { useAuth0 } from "@auth0/auth0-react";
import { Box, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { CoffeeChart } from "./CoffeeChart/CoffeeChart";
import { CoffeeForm } from "./CoffeeForm/CoffeeForm";
import { CoffeeTable } from "./CoffeeTable/CoffeeTable";

export function Main() {
    const { getAccessTokenSilently } = useAuth0();
    const [coffees, setCoffees] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isBadRequest, setIsBadRequest] = useState<boolean>(false);
    const headers = [{ name: "created" }, { name: "size" }];

    useEffect(() => {
        setTimeout(() => {
            (async () => {
                const token = await getAccessTokenSilently();
                const response = await fetch(
                    "http://localhost:3010/api/coffees",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    setIsLoading(false);
                    setCoffees(await response.json());
                }

                if (!response.ok) {
                    setIsBadRequest(true);
                }
            })();
        }, 1000);
    }, [getAccessTokenSilently]);

    return (
        <Box>
            {!isLoading ? (
                <Fragment>
                    <Box height={'500px'}>
                        <CoffeeChart />
                    </Box>
                    <CoffeeForm setCoffees={setCoffees} />

                    {coffees.length > 0 ? (
                        <CoffeeTable headers={headers} rows={coffees} />
                    ) : (
                        <Text>{"EMPTY"}</Text>
                    )}
                </Fragment>
            ) : (
                <Text>
                    {isBadRequest ? "ERROR WITH FETCHING COFFEES" : "LOADING"}
                </Text>
            )}
        </Box>
    );
}
