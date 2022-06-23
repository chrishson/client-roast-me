import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface Header {
    name: string;
}

interface Coffee {
    created_at: string
    size: string
}

interface TableRowProps {
    coffee: Coffee
}


interface TableProps {
    headers: Header[]
    coffees: Coffee[]
}

export function TableRow({ coffee }: TableRowProps) {
    return (
        <tr>
            <td>{coffee.created_at}</td>
            <td>{coffee.size}</td>
        </tr>
    );
}

export function Table({ headers, coffees }: TableProps) {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header: Header, key: number) => {
                        return <th key={key}> {header.name} </th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {coffees.map((coffee: Coffee, key: number) => {
                    return <TableRow coffee={coffee} key={key} />;
                })}
            </tbody>
        </table>
    );
}

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
            {coffees.length > 0 ? (
                <Table headers={headers} coffees={coffees} />
            ) : (
                'Loading...'
            )}
        </div>
    );
}