import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading";
import { removeUser } from "../../features/userSlice";
import { Property } from "../../modals/Property";

const ManageProperty = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const {
    data: properties,
    isLoading,
    refetch,
  } = useQuery("manage-properties", () =>
    fetch("http://localhost:5000/property-admin").then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading />;
  }

  const handleDeleteProperty = (id: string) => {
    fetch(`http://localhost:5000/property/${id}`, {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          dispatch(removeUser());
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          toast.success("Successfully Deleted", { id: "deleteSuccess" });
          refetch();
        }
      });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Property Name</th>
            <th>Owner Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties &&
            properties.map((property: Property, index: number) => {
              const { id, property_name, owner_email } = property;
              return (
                <tr key={id}>
                  <th>{index + 1}</th>
                  <td>{property_name}</td>
                  <td>{owner_email}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteProperty(id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperty;
