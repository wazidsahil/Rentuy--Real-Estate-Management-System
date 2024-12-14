export interface Property {
  id: string;
  property_name: string;
  status: "available" | "taken";
  property_use: "rental" | "sale";
  neighborhood: string;
  size: string;
  beds: string;
  baths: string;
  property_type: "residential" | "commercial" | "industrial";
  city:
    | "Chattogram"
    | "Dhaka"
    | "Khulna"
    | "Mymensingh"
    | "Rajshahi"
    | "Barisal"
    | "Rangpur"
    | "Sylhet";
  image: string;
  owner_email?: string;
  owner?: any
  sale?: {id: string, price: number}
  rental?: {id: string, monthly_rent: number, lease_term: number}
}
