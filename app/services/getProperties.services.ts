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
