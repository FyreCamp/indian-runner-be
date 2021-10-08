export const getStarted = (req, res) => {
  const { email } = req.body;
  res.json({ email });
};
