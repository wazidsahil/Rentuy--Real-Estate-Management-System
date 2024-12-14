import React, { FC, useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { BiBed } from "react-icons/bi";
import { MdAlternateEmail, MdOutlinePersonOutline } from "react-icons/md";
import { TbBath, TbSquaresFilled } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeUser } from "../../features/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const ApplicationCard = ({ rent, refetch }: {rent: any, refetch: any}) => {
  
  const {name: propertyName, image, city, beds, baths, size, id, property_use, } = rent?.property;
  const {name: ownerName, email, contact} = rent?.property?.owner;
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  const handleTransaction = () =>{
    if(user?.email || user?.name || user?.token){
      const transactionInfo = {
        property_id: id,
        transaction_type: property_use === "rental" ? "rent" : "sale",
        date: new Date(),
        final_price: rent?.property?.rental?.monthly_rent || rent?.property?.sale?.price,
        status :'pending',
        client_email: user?.email,
      };
      fetch("http://localhost:5000/transaction", {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        method: "POST",
        body: JSON.stringify(transactionInfo),
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            dispatch(removeUser());
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if(data){
            toast.success("Transaction Complete", { id: "transaction-success" });
          refetch();
          }else{
            toast('You already have made transaction')
          }
        });
    } 
    else {
    navigate("/login");
    return toast.error("Please, Login", { id: "transaction-error" });
  }
  }

  


  return (
    <div className="rounded bg-white border border-primary relative w-full md:h-80 flex overflow-hidden">
      <div className="w-72 lg:w-96">
        
        <img className="w-full h-full" src={image} alt="" />
      </div>
      <div className="mt-3 p-3 grid grid-cols-3 w-full">
      <div className="col-span-2">
        {
          rent?.property?.rental && <p>
          <span className="text-primary font-semibold text-xl">
            {rent?.property?.rental?.monthly_rent} TK
          </span>
          <span className="text-gray-500">/month</span>
        </p>
        }
        {
          rent?.property?.sale && <p>
          <span className="text-primary font-semibold text-xl">
            {rent?.property?.sale?.price} TK
          </span>
          <span className="text-gray-500">/month</span>
        </p>
        }
        <h3 className="text-2xl font-semibold">{propertyName}</h3>
        <p className="text-gray-500 text-lg">{city}</p>
        <div className="md:grid md:grid-cols-3 mt-6">
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <BiBed className="text-xl" /> {beds} Beds
          </span>
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <TbBath className="text-xl" /> {baths} Baths
          </span>
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <TbSquaresFilled className="text-xl" />
            {size} &#13217;
          </span>
        </div>
        <div className="bg-base-100 p-2 rounded-lg mt-8 overflow-x-auto">
          <h3 className="text-accent text-lg font-semibold">Property Owner</h3>
          <hr className="mb-3" />
          <p>
            <span className="flex gap-2 items-center text-gray-600 font-semibold">
              <MdOutlinePersonOutline className="text-xl" />:{" "}
              {ownerName}
            </span>
          </p>
          <p>
            <span className="flex gap-2 items-center text-gray-600 font-semibold">
              <AiOutlinePhone className="text-xl" />: {contact}
            </span>
          </p>
          <p>
            <span className="flex gap-2 items-center text-gray-600 font-semibold">
              <MdAlternateEmail className="text-xl" />: {email}
            </span>
          </p>
        </div>
      </div>
      <div className="col-span-1 flex flex-col justify-between items-end">
        <span
          className={`text-white font-semibold text-lg uppercase p-2 rounded-3xl ${
            rent?.status === "pending" && "bg-primary"
          } ${rent?.status === "declined" && "bg-error"} ${
            rent?.status === "accepted" && "bg-success"
          }`}
        >
          {rent?.status}
        </span>
        {
          rent?.status === "accepted" && <button className="bg-primary border-none text-white px-2 py-1 text-xl rounded" onClick={handleTransaction}>Make Transaction</button>
        }
        </div>
      </div>
      
      
    </div>
  );
};

export default ApplicationCard;

