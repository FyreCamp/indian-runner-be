import Faq from "../models/faq.model";

export const listFaqs = async (req, res) => {
  const faqs = await Faq.find({});
  res.status(200).json(faqs);
};

export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.findById(req.params.id);
    res.status(200).json(faqs);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};
