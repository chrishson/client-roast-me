interface Header {
    name: string;
}

interface Coffee {
    consumption_date: string
    size: string
}

interface CoffeeTableRowProps {
    coffee: Coffee;
}


interface TableProps {
    headers: Header[]
    rows: Coffee[]
}

export function CoffeeTableRow({ coffee }: CoffeeTableRowProps) {
    return (
        <tr>
            <td>{coffee.consumption_date}</td>
            <td>{coffee.size}</td>
        </tr>
    );
}

export function CoffeeTable({ headers, rows }: TableProps) {
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
                {rows.map((coffee: Coffee, key: number) => {
                    return <CoffeeTableRow coffee={coffee} key={key} />;
                })}
            </tbody>
        </table>
    );
}