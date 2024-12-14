import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiBed } from "react-icons/bi";
import { TbBath } from "react-icons/tb";
import { TbSquaresFilled } from "react-icons/tb";
import { Property } from "../../modals/Property";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { MdAlternateEmail, MdLocationCity } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import BookingModal from "./BookingModal";
import { useQuery } from "react-query";
import { useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property>();
  const [bookingProperty, setBookingProperty] = useState<Property | null>();

  useEffect(() => {
    fetch(`http://localhost:5000/property/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data));
  }, [id]);

  const {
    data: bookingStatus,
    isLoading,
    refetch,
  } = useQuery(["booking_status", user, id], () =>
    fetch(
      `http://localhost:5000/isApplied?id=${id}&email=${user?.email}`
    ).then((res) => res.json())
  );

  // const { data: property?.owner, isLoading: isOwnerLoading } = useQuery(
  //   ["property_owner", property],
  //   () => {
  //     if (property?.owner_email) {
  //       return fetch(
  //         `http://localhost:5000/user/${property?.owner_email}`
  //       ).then((res) => res.json());
  //     }
  //   }
  // );

  console.log(property)


  if (isLoading) {
    return <Loading />;
  }


  return (
    <div>
      <div className="lg:px-12">
        <span
          onClick={() => navigate("/")}
          className="flex gap-2 items-center text-primary font-semibold cursor-pointer w-fit"
        >
          <AiOutlineLeft className="text-xl" />
          Back to map
        </span>
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-2">{property?.property_name}</h1>
          <div className="text-xl">
            <span className="text-primary">
              {property?.property_type?.toUpperCase()}
            </span>{" "}
            property in{" "}
            <span className="text-primary">
              {property?.city?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="mt-8">
          <img
            className="rounded-lg w-90 h-96 mx-auto"
            src={property?.image ? property.image : ""}
            alt=""
          />
          <div className="stats stats-vertical md:stats-horizontal shadow w-full mt-8 border border-accent">
            <div className="stat">
              <div className="stat-title">Beds</div>
              <div>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <BiBed className="text-xl text-primary" />{" "}
                  {property?.beds ? property.beds : ""} Beds
                </span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Baths</div>
              <div>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <TbBath className="text-xl text-primary" />{" "}
                  {property?.baths ? property.baths : ""} Baths
                </span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Square Area</div>
              <div>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <TbSquaresFilled className="text-xl text-primary" />{" "}
                  {property?.size ? property.size : ""} &#13217;
                </span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-8">
            <div className=" border border-accent rounded-lg p-2 lg:p-4">
              <div className="shadow-lg bg-white p-2 rounded-lg mb-8">
                <h3 className="text-accent text-lg font-semibold">
                  Property Owner
                </h3>
                <hr className="mb-3" />
                <p>
                  <span className="flex gap-2 items-center text-gray-600 font-semibold">
                    <MdOutlinePersonOutline className="text-xl text-primary" />:{" "}
                    {property?.owner?.name ? property?.owner?.name : ""}
                  </span>
                </p>
                <p>
                  <span className="flex gap-2 items-center text-gray-600 font-semibold">
                    <AiOutlinePhone className="text-xl text-primary" />:{" "}
                    {property?.owner?.contact ? property?.owner?.contact : ""}
                  </span>
                </p>
                <p>
                  <span className="flex gap-2 items-center text-gray-600 font-semibold">
                    <MdLocationCity className="text-xl text-primary" />:{" "}
                    {property?.owner?.city ? property?.owner?.city : ""}
                  </span>
                </p>
                <p>
                  <span className="flex gap-2 items-center text-gray-600 font-semibold">
                    <MdAlternateEmail className="text-xl text-primary" />:{" "}
                    {property?.owner?.email ? property?.owner?.email : ""}
                  </span>
                </p>
              </div>
            </div>
            <div className=" border border-accent rounded-lg p-2 lg:p-4">
              <p>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <span className="text-primary">Property Type:</span>{" "}
                  {property?.property_type
                    ? property?.property_type?.toUpperCase()
                    : ""}
                </span>
              </p>
              <p>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <span className="text-primary">City:</span>{" "}
                  {property?.city ? property?.city?.toUpperCase() : ""}
                </span>
              </p>
              <p>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <span className="text-primary">Neighbourhood:</span>{" "}
                  {property?.neighborhood ? property?.neighborhood?.toUpperCase() : ""}
                </span>
              </p>
              {property?.property_use === "sale" && property?.sale && (
                <p>
                  <span className="flex gap-2 items-center text-gray-600 font-semibold">
                    <span className="text-primary">Asking Price:</span>{" "}
                    {property?.sale?.price ? property?.sale?.price : ""} TK
                  </span>
                </p>
              )}
              {property?.property_use === "rental" && property?.rental && (
                <>
                  <p>
                    <span className="flex gap-2 items-center text-gray-600 font-semibold">
                      <span className="text-primary">Monthly Rent:</span>{" "}
                      {property?.rental?.monthly_rent ? property?.rental?.monthly_rent : ""} TK
                    </span>
                  </p>
                  <p>
                    <span className="flex gap-2 items-center text-gray-600 font-semibold">
                      <span className="text-primary">Lease Term:</span>{" "}
                      {property?.rental?.lease_term ? property?.rental?.lease_term : ""} months
                    </span>
                  </p>
                </>
              )}
              {user?.email !== property?.owner?.email ? (
                <>
                  {bookingStatus.success ? (
                    <p className="text-lg text-white mt-2 uppercase bg-secondary rounded-3xl py-1 px-2 font-semibold w-fit">
                      {bookingStatus.status}
                    </p>
                  ) : (
                    <label
                      onClick={() => setBookingProperty(property)}
                      htmlFor="booking-modal"
                      className="btn btn-primary rounded mt-4"
                    >
                      {property?.property_use === "sale"
                        ? "Apply to Buy "
                        : "Apply for Rent"}
                    </label>
                  )}
                </>
              ) : (
                <p className="mt-8">You are the owner of this property</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {bookingProperty && (
        <BookingModal
          bookingProperty={bookingProperty}
          setBookingProperty={setBookingProperty}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default PropertyDetails;
