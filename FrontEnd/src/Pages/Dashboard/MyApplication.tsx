import React, { FC } from "react";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading";
import { removeUser } from "../../features/userSlice";
import { Booking } from "../../modals/Booking";
import ApplicationCard from "./ApplicationCard";

const MyApplication: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { data: myRents, isLoading, refetch} = useQuery("incoming-application", () =>
    fetch(`http://localhost:5000/my-applications/${user?.email}`, {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        dispatch(removeUser());
      } else {
        return res.json();
      }
    })
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col space-y-3">
      {myRents.length === 0 ? (
        <h1 className="text-lg md:text-2xl font-semibold text-center text-primary">
          You have No Rent Application
        </h1>
      ) : (
        myRents &&
        myRents.map((rent: Booking) => <ApplicationCard key={rent.id} rent={rent} refetch={refetch}/>)
      )}
    </div>
  );
};

export default MyApplication;
