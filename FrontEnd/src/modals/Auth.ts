export interface User {
  name?: string;
  email: string;
  password: string;
  gender?: "male" | "female";
  age?: number;
  contact?: string;
  city?:
    | "Chattogram"
    | "Dhaka"
    | "Khulna"
    | "Mymensingh"
    | "Rajshahi"
    | "Barisal"
    | "Rangpur"
    | "Sylhet";
}
