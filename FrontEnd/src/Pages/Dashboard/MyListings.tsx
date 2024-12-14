import React, { FC } from "react";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading";
import { removeUser } from "../../features/userSlice";
import { Property } from "../../modals/Property";
import ListingCard from "./ListingCard";

const MyListings: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { data: mySales, isLoading } = useQuery(["my-listing", user], () =>
    fetch(`http://localhost:5000/my-listings/${user?.email}`, {
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
    <div className="flex flex-col gap-8 px-3">
      {mySales.length === 0 ? (
        <h1 className="text-3xl font-semibold text-center">
          You have No Property in Sale
        </h1>
      ) : (
        mySales &&
        mySales.map((listing: Property) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      )}
    </div>
  );
};

export default MyListings;
