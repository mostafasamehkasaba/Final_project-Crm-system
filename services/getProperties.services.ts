export default async function getProperties() {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/`);
    if (!res.ok) {
      throw new Error(res.statusText || "failed to fetch Properties");
    }
    const data = await res.json();
    console.log({ data });

    return data.data;
  } catch (error) {
    return { error: error as string };
  }
}


// app/services/property.service.ts

export const propertyService = {
  async getAll() {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/products",

      );

      if (!res.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await res.json();

      return data.data;
    } catch (error) {
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Property not found");
      }

      const data = await res.json();

      return data.data;
    } catch (error) {
      throw error;
    }
  },

  async create(propertyData: any) {
    console.log("Create Property", propertyData);
  },

  async update(id: string, propertyData: any) {
    console.log("Update Property", id, propertyData);
  },

  async delete(id: string) {
    console.log("Delete Property", id);
  },
  
};