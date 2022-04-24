import { Table } from "react-bootstrap"

const StockTable = ({ stocks }) => {
    let profitOrLoss = 0;
    let currentPortfolioValue = 0;
    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Stock Symbol</th>
                    <th>Number of Shares</th>
                    <th>Bought Price/share</th>
                    <th>Current Price/share</th>
                    <th>Amount Invested</th>
                    <th>Profit/Loss</th>
                </tr>
            </thead>
            <tbody>
                {stocks && stocks.map((el, index) => {
                    profitOrLoss += (el.currPPS - el.broughtPPS);
                    currentPortfolioValue += (el.currPPS * el.shares);
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
                
                        <tr>
                            <td colSpan={5} style={{textAlign: "right"}}>Total</td>
                            <td>{currentPortfolioValue.toFixed(2)}</td>
                            <td>{profitOrLoss.toFixed(2)}</td>
                        </tr>
                
            </tbody>
        </Table>
    )
}
export default StockTable