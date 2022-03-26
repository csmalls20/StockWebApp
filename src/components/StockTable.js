import { Table } from "react-bootstrap"

const StockTable = ({ stocks }) => {
    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Symbol</th>
                    <th>Shares</th>
                    <th>Bought/share</th>
                    <th>Current Price/share</th>
                    <th>Amount</th>
                    <th>Profit/Loss</th>
                </tr>
            </thead>
            <tbody>
                {stocks && stocks.map((el, index) => {
                    return (
                        <tr key={index}>
                            <td>{el.id}</td>
                            <td>{el.symbol}</td>
                            <td>{parseFloat(el.shares).toFixed(2)}</td>
                            <td>{parseFloat(el.broughtPPS).toFixed(2)}</td>
                            <td>{el.currPPS}</td>
                            <td>{el.amount.toFixed(2)}</td>
                            <td>
                                {(el.currPPS - el.broughtPPS).toFixed(2)}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
export default StockTable