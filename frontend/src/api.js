const API = import.meta.env.VITE_API_URL;

async function request(path, options) {
  const res = await fetch(`${API}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const getProducts = (params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v)
  ).toString();
  return request(`/products${query ? `?${query}` : ""}`);
};

export const getProduct = (id) => request(`/products/${id}`);

export const createOrder = (payload) =>
  request("/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });