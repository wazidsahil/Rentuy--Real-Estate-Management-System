import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../modals/Auth";
import Input from "../../Components/Input";
import SelectInput from "../../Components/SelectInput";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [contact, setContact] = useState<string>("");
  const [city, setCity] = useState<
    | "Chattogram"
    | "Dhaka"
    | "Khulna"
    | "Mymensingh"
    | "Rajshahi"
    | "Barisal"
    | "Rangpur"
    | "Sylhet"
  >("Chattogram");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
      const newUser: User = {
        name,
        email,
        password,
        gender,
        age,
        contact,
        city,
      };
      console.log(newUser)
      const res = await fetch(
        "http://localhost:5000/sign-up",
        {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(newUser),
        }
      );
      const data = await res.json();
      if (data.status) {
        navigate("/login");
        toast.success("Please, Login with the created account", {
          id: "signUp-success",
        });
      } else {
        toast.error(data.error, { id: "signUp-failed" });
      }
    
  };

  return (
    <div className="w-11/12 md:w-1/2 lg:w-2/5 mx-auto p-2 md:p-4 border border-solid border-primary rounded">
      <form onSubmit={(e) => handleSignUp(e)}>
        <h1 className="text-center text-2xl text-primary mb-6">
          Create An Account
        </h1>
        <Input
          type="text"
          label="Name"
          placeholder="full name"
          onChange={(e: any) => setName(e.target.value)}
          required
        />

        <Input
          type="email"
          label="Email"
          placeholder="example@gmail.com"
          onChange={(e: any) => setEmail(e.target.value)}
          required
        />

        <SelectInput
          id="gender"
          label="Gender"
          onChange={(e: any) => setGender(e.target.value)}
          required={true}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </SelectInput>

        <Input
          type="number"
          label="Age"
          placeholder="example: 34"
          onChange={(e: any) => setAge(parseInt(e.target.value))}
          required
        />

        <Input
          type="text"
          label="Phone number"
          placeholder="01823232323"
          onChange={(e: any) => setContact(e.target.value)}
          required
        />

        <SelectInput
          id="city"
          label="City"
          onChange={(e: any) => setCity(e.target.value)}
          required={true}
        >
          <option value="Chattogram">Chattogram</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Khulna">Khulna</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Barisal">Barisal</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Sylhet">Sylhet</option>
        </SelectInput>

        <Input
          type="password"
          label="Password"
          placeholder="Password"
          onChange={(e: any) => setPassword(e.target.value)}
          required
        />

        <label className="label">
          <p>
            Already Registered?{" "}
            <Link to="/login" className="underline text-secondary">
              Login
            </Link>
          </p>
        </label>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary rounded">
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
