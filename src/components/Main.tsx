import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export function Main() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState({ message: '' });

    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch('http://localhost:3010/api/private', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(await response.json());
            } catch (e) {
                console.error(e);
            }
        })();
    }, [getAccessTokenSilently]);

    return <div> {data?.message} </div>
}