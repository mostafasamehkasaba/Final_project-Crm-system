export interface PropertyFeature {
  _id: string;
  filterName: string;
  value: string;
}

export interface IProperty {
  _id: string;
  title: string;
  description: string;
  category: string;
  bookType: "sale" | "rent";
  location: string;
  region: string;
  price: number;
  features: PropertyFeature[];
  images: string[];
  status: "available" | "sold" | "rented";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
