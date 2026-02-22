const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export async function sendContactMessage({ name, email, phone, message, productIds }) {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, phone, message, productIds }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to send message. Please try again.');
  }

  return res.json();
}

export async function trackInquiry(referenceCode) {
  const res = await fetch(`${BASE_URL}/contact/track/${referenceCode}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Inquiry not found');
  }

  return res.json();
}

