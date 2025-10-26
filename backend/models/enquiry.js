const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [
        /^[0-9]{10,15}$/,
        "Phone number should be between 10 and 15 digits",
      ],
    },

    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      postalCode: { type: String, trim: true },
    },

    company: { type: String, trim: true },
    position: { type: String, trim: true },
    website: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w-]+)\.([a-z]{2,6})(\/[\w-.]*)*\/?$/,
        "Please enter a valid URL",
      ],
    },
    notes: { type: String, trim: true },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Prospect"],
      default: "Active",
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", contactSchema);
