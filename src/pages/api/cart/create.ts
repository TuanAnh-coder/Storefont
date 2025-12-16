import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { region_id } = req.body;

    // Call Medusa API directly with minimal payload
    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
      },
      body: JSON.stringify({
        region_id: region_id || 'reg_01KA6D8RVWE2V0Y4W9N439NTBY',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Medusa API error:', data);
      return res.status(response.status).json({ error: data.message || 'Failed to create cart' });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Cart creation error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
