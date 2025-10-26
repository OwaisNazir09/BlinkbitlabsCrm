import React, { useState } from 'react';
import { useAddEnquiryMutation } from './enquiryServcie';
import PageTitle from '../../components/common/PageTitle';

const AddEnquiry = ({ initialData = {} }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || 'Test',
     lastName: initialData.lastName || 'User',
    email: initialData.email || '',
    phone: initialData.phone || '',
    street: initialData.address?.street || '',
    city: initialData.address?.city || '',
    state: initialData.address?.state || '',
    country: initialData.address?.country || '',
    postalCode: initialData.address?.postalCode || '',
    company: initialData.company || '',
    position: initialData.position || '',
    website: initialData.website || '',
    notes: initialData.notes || '',
    status: initialData.status || 'Active',
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [addEnquiry, { isLoading }] = useAddEnquiryMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      await addEnquiry(formData).unwrap();
      setMessage({ type: 'success', text: 'Enquiry added successfully!' });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        company: '',
        position: '',
        website: '',
        notes: '',
        status: 'Active',
      });
    } catch (err) {
      console.error(err);
      setMessage({
        type: 'error',
        text: err?.data?.message || 'Failed to add enquiry. Please try again.',
      });
    }
  };

  return (
    <div className="container mt-5">
      <PageTitle title="Add Enquiry" />
      <div className="card shadow-lg p-4">
        {message.text && (
          <div
            className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}
            role="alert"
          >
            {message.text}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage({ type: '', text: '' })}
            />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Name */}
            <div className="col-md-6">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Email & Phone */}
            <div className="col-md-6">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Address */}
            <div className="col-md-6">
              <label className="form-label">Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="form-control"
                placeholder="Street address"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control"
                placeholder="State"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
                placeholder="Country"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="form-control"
                placeholder="Postal code"
              />
            </div>

            {/* Company & Position */}
            <div className="col-md-6">
              <label className="form-label">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-control"
                placeholder="Company name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="form-control"
                placeholder="Position"
              />
            </div>

            {/* Website */}
            <div className="col-md-6">
              <label className="form-label">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="form-control"
                placeholder="Website URL"
              />
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Prospect">Prospect</option>
              </select>
            </div>

            {/* Notes */}
            <div className="col-12">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-control"
                rows={3}
                placeholder="Additional notes"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-4 text-end">
            <button
              type="submit"
              className="btn btn-success px-5"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Adding...
                </>
              ) : (
                'Add Enquiry'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEnquiry;
