import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading";
import { removeUser } from "../../features/userSlice";

const ManageUser = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("manage-users", () =>
    fetch("http://localhost:5000/user", { 
        headers: {
        authorization: `Bearer ${user?.token}`,
      },
    }).then((res) =>
      res.json()
    )
  );

  console.log(users)

  if (isLoading) {
    return <Loading />;
  }

  const handleDeleteUser = (email: string) => {
    console.log(email)
    fetch(`http://localhost:5000/user/${email}`, {
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
        console.log(data)
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
            <th>User Id</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((singleUser: any, index: number) => {
              const { id, name, email, contact } = singleUser;
              return (
                <tr key={id}>
                  <th>{id}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{contact}</td>
                  <td>
                    {
                        singleUser?.role !== "admin"  ? <button
                        onClick={() => handleDeleteUser(email)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>: "Admin"
                    }
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
