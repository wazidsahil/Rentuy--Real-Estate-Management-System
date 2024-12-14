import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useQuery } from "react-query";
import { format } from "date-fns";


const IncomingTransaction = () =>{

    const { user } = useAppSelector((state) => state.userReducer);

    const {
        data: transactions,
        isLoading,
        refetch,
      } = useQuery("manage-transaction", () =>
        fetch(`http://localhost:5000/incoming-transaction/${user?.email}`).then((res) =>
          res.json()
        )
      );

    const handleTransaction = async (id: string, status: string) => {
        fetch(`http://localhost:5000/transaction/${id}`, 
            {
                headers: {
                  "content-type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify({status}),
              }
        ).then(res => res.json()).then(data => {
            data && refetch();
        })
    }

    if(isLoading) return <></>

    return <div className="w-full">

        <table className="w-full">
            <thead className="bg-gray-200 text-xl mb-2">
                <tr>
                    <th className="p-3">Image</th>
                    <th className="p-3">Transaction ID</th>
                    <th className="p-3">Property ID</th>
                    <th className="p-3">Property Name</th>
                    <th className="p-3">Client Name</th>
                    <th className="p-3">Client Email</th>
                    <th className="p-3">Client Contact</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Action</th>
                </tr>
            </thead>
            <tbody className="bg-gray-100">
                {transactions?.map((transaction: any) => (
                    <tr key={transaction?.id} className="py-1">
                        <td className="text-center p-3"><img src={transaction?.property?.image} className="w-24 h-20" alt="" /></td>
                        <td className="text-center p-3">{transaction?.id}</td>
                        <td className="text-center p-3">{transaction?.property?.id}</td>
                        <td className="text-center p-3">{transaction?.property?.property_name}</td>
                        <td className="text-center p-3">{transaction?.client?.name}</td>
                        <td className="text-center p-3">{transaction?.client?.email}</td>
                        <td className="text-center p-3">{transaction?.client?.contact}</td>
                        <td className="text-center p-3">{transaction?.final_price}</td>
                        <td className="text-center p-3">{format(new Date(transaction?.date), "MMM-dd-yyyy")}</td>
                        <td className="text-center p-3">
                            {
                                transaction?.status === "pending" && <><button onClick={()=> handleTransaction(transaction?.id, 'accepted')} className="bg-green-600 text-white text-sm rounded p-1 w-16 flex items-center justify-center mb-2">accept</button>
                            <button onClick={()=> handleTransaction(transaction?.id, 'declined')} className="bg-red-600 text-white text-sm rounded p-1 w-16 flex items-center justify-center">decline</button></>
                            }
                            {transaction?.status === "accepted" && "Accepted"}
                            {transaction?.status === "declined" && "Declined"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default IncomingTransaction;