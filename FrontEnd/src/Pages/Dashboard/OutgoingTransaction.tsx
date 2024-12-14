import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const OutgoingTransaction = () =>{

    const [transactions, setTransactions] = useState([]);
    const { user } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        fetch(`http://localhost:5000/outgoing-transaction/${user?.email}`).then(res => res.json()).then(data => setTransactions(data))
    },[]);

    return <div className="w-full">

        <table className="w-full">
            <thead className="bg-gray-200 text-xl mb-2">
                <tr>
                    <th>Transaction ID</th>
                    <th>Property ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody className="bg-gray-100">
                {transactions.map((transaction: any) => (
                    <tr key={transaction?.id} className="py-1">
                        <td className="text-center">{transaction?.id}</td>
                        <td className="text-center">{transaction?.propertyId}</td>
                        <td className="text-center">{transaction?.final_price}</td>
                        <td className="text-center">{transaction?.date}</td>
                        <td className="text-center">{transaction?.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default OutgoingTransaction;