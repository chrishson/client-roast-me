import { Heading, Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";

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
        <Tr>
            <Td>
                {new Date(coffee.consumption_date).toLocaleDateString()} at {new Date(coffee.consumption_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Td>
            <Td>{coffee.size}</Td>
        </Tr>
    );
}

export function CoffeeTable({ headers, rows }: TableProps) {
    return (
        <TableContainer>
            <Heading>
                Coffee Drinking History
            </Heading>
            <Table variant={'striped'} size={'sm'}>
                <Thead textAlign={'left'}>
                    <Tr>
                        {headers.map((header: Header, key: number) => {
                            return <th key={key}> {header.name} </th>;
                        })}
                    </Tr>
                </Thead>
                <Tbody>
                    {rows.map((coffee: Coffee, key: number) => {
                        return <CoffeeTableRow coffee={coffee} key={key} />;
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}