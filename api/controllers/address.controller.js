import Address from "./../models/address.Schema.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id;

    const { address } = req.body;

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Add given address details" });
    }

    const newAddress = new Address({ userId, ...address });

    await newAddress.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully!",
      newAddress,
    });
  } catch (error) {
    console.error("Add Address Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.user._id;

    const address = await Address.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    console.error("Add Address Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
