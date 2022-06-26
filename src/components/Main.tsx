import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { CoffeeForm } from "./CoffeeForm/CoffeeForm";
import { CoffeeTable } from "./CoffeeTable/CoffeeTable";

export function Main() {
    const { getAccessTokenSilently } = useAuth0();
    const [coffees, setCoffees] = useState([]);
    const headers = [{ name: 'created' }, { name: 'size' }];

    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch('http://localhost:3010/api/coffees', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCoffees(await response.json());
            } catch (e) {
                console.error(e);
            }
        })();
    }, [getAccessTokenSilently]);

    return (
        <div>
            <CoffeeForm setCoffees={setCoffees}/>
            {coffees.length > 0 ? (
                <CoffeeTable headers={headers} rows={coffees} />
            ) : (
                'Loading...'
            )}
        </div>
    );
}