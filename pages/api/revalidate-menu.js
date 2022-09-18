const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return (
      res.status(400),
      json({ error: 'Invalid HTTP method. Only POST requests are allowed.' })
    );
  }

  if (req.query.secret != process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token!' });
  }

  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: 'Bad request - no body!' });
  }

  try {
    const pageToRevalidate = body.pageToRevalidate;
    if (pageToRevalidate) {
      await res.revalidate(`/pages/${pageToRevalidate}`);
      return res.json({ revalidated: true });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error revalidating!' });
  }
};

export default handler;
