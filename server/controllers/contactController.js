const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// ==========================================
// CREATE CONTACT MESSAGE
// ==========================================

const createContact = async (req, res) => {

  try {

    const {

      fullName,

      email,

      phone,

      subject,

      message,

    } = req.body;

    if (
      !fullName ||
      !email ||
      !subject ||
      !message
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please fill all required fields.",

      });

    }

    const contact =
      await Contact.create({

        fullName,

        email,

        phone,

        subject,

        message,

      });

    // ======================================
    // EMAIL TO COMPANY
    // ======================================

    if (
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS
    ) {

      await sendEmail({

        to: process.env.EMAIL_USER,

        subject: `New Contact Form - ${subject}`,

        html: `

          <h2>New Contact Form Submission</h2>

          <p><strong>Name:</strong> ${fullName}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone || "-"}</p>

          <p><strong>Subject:</strong> ${subject}</p>

          <p><strong>Message:</strong></p>

          <p>${message}</p>

        `,

      });

      // ======================================
      // AUTO REPLY
      // ======================================

      await sendEmail({

        to: email,

        subject:
          "We've received your message",

        html: `

          <h2>Hello ${fullName},</h2>

          <p>

            Thank you for contacting
            <strong>EdMed Connect</strong>.

          </p>

          <p>

            Our team has received your
            message and will get back to
            you shortly.

          </p>

          <hr/>

          <h3>Your Message</h3>

          <p><strong>Subject:</strong> ${subject}</p>

          <p>${message}</p>

          <br/>

          <p>

            Regards,<br/>
            EdMed Connect Team

          </p>

        `,

      });

    }

    res.status(201).json({

      success: true,

      message:
        "Message sent successfully.",

      data: contact,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================================
// GET ALL CONTACTS
// ==========================================

const getContacts = async (req, res) => {

  try {

    const contacts =
      await Contact.find()

      .sort({
        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      data: contacts,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================================
// UPDATE STATUS
// ==========================================

const updateContact = async (req, res) => {

  try {

    const contact =
      await Contact.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      );

    if (!contact) {

      return res.status(404).json({

        success: false,

        message:
          "Contact not found.",

      });

    }

    res.json({

      success: true,

      data: contact,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================================
// DELETE
// ==========================================

const deleteContact = async (req, res) => {

  try {

    const contact =
      await Contact.findById(
        req.params.id
      );

    if (!contact) {

      return res.status(404).json({

        success: false,

        message:
          "Contact not found.",

      });

    }

    await contact.deleteOne();

    res.json({

      success: true,

      message:
        "Contact deleted successfully.",

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {

  createContact,

  getContacts,

  updateContact,

  deleteContact,

};