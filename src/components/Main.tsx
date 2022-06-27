import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CoffeeForm } from "./CoffeeForm/CoffeeForm";
import { CoffeeTable } from "./CoffeeTable/CoffeeTable";

export function Main() {
    const { getAccessTokenSilently } = useAuth0();
    const [coffees, setCoffees] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const headers = [{ name: "created" }, { name: "size" }];

    useEffect(() => {
        setTimeout(() => {
            (async () => {
                try {
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
                } catch (e) {
                    console.error(e);
                }
            })();
        }, 1000);
    }, [getAccessTokenSilently]);

    return (
        <div>
            {!isLoading ? (
                <React.Fragment>
                    <CoffeeForm setCoffees={setCoffees} />

                    {coffees.length > 0 ? (
                        <CoffeeTable headers={headers} rows={coffees} />
                    ) : (
                        <div>EMPTY</div>
                    )}
                </React.Fragment>
            ) : (
                <div>LOADING</div>
            )}
        </div>
    );
}
