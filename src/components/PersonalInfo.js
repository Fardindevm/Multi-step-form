import React, { useState } from 'react';
import validator from 'validator';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PersonalInfo = ({ formData, updateFormData, errors, setErrors }) => {
  const { personalInfo } = formData;
  const [phoneInputValue, setPhoneInputValue] = useState(personalInfo.phone || '');

  const validateField = (name, value) => {
    let error = '';
    if (!value || value.trim() === '') {
      error = "This field is required";
    } else {
      switch (name) {
        case 'name':
          if (value.trim().length < 3) {
            error = "Name must be at least 3 characters long";
          } else if (value.trim().split(/\s+/).length < 2) {
            error = "Please enter at least two names";
          }
          break;
        case 'email':
          if (!validator.isEmail(value)) {
            error = "Invalid email address";
          }
          break;
        case 'phone':
          const digitsOnly = value ? value.replace(/\D/g, '') : '';
          if (digitsOnly.length < 10) {
            error = "Phone number is too short";
          } else if (digitsOnly.length > 11) {
            error = "Phone number is too long";
          }
          break;
        default:
          break;
      }
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      personalInfo: {
        ...personalInfo,
        [name]: value
      }
    });

    // Validate the field and update errors
    const error = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handlePhoneChange = (value) => {
    setPhoneInputValue(value);
    updateFormData({
      personalInfo: {
        ...personalInfo,
        phone: value
      }
    });

    // Validate the phone number and update errors
    const error = validateField('phone', value);
    setErrors(prevErrors => ({
      ...prevErrors,
      phone: error
    }));
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-4xl font-bold text-[var(--marine-blue)]'>Personal info</h1>
      <p className='text-[var(--cool-gray)]'>Please provide your name, email address, and phone number.</p>
      <form className='flex flex-col mt-4 sm:mt-2 xl:mt-6 gap-5'>
        <div>
          <div className="flex justify-between">
            <label htmlFor="name" className='text-[var(--marine-blue)]'>Name</label>
            {errors.name && <span className="text-[var(--strawberry-red)] text-sm">{errors.name}</span>}
          </div>
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder='e.g. Stephen King' 
            className={`block w-full border py-3 rounded-lg px-4 mt-2 ${errors.name ? 'border-[var(--strawberry-red)]' : 'border-[var(--light-gray)]'}`}
            value={personalInfo.name || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <label htmlFor="email" className='text-[var(--marine-blue)]'>Email Address</label>
            {errors.email && <span className="text-[var(--strawberry-red)] text-sm">{errors.email}</span>}
          </div>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='e.g. stephenking@lorem.com' 
            className={`block w-full border py-3 rounded-lg px-4 mt-2 ${errors.email ? 'border-[var(--strawberry-red)]' : 'border-[var(--light-gray)]'}`}
            value={personalInfo.email || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <label htmlFor="phone" className='text-[var(--marine-blue)]'>Phone Number</label>
            {errors.phone && <span className="text-[var(--strawberry-red)] text-sm">{errors.phone}</span>}
          </div>
          <PhoneInput
            international
            countryCallingCodeEditable={true}
            defaultCountry="US"
            placeholder="e.g. +1 234 567 890"
            value={phoneInputValue}
            onChange={handlePhoneChange}
            onKeyDown={handlePhoneKeyDown}
            className={`block w-full border py-3 rounded-lg px-4 mt-2 ${errors.phone ? 'border-[var(--strawberry-red)]' : 'border-[var(--light-gray)]'}`}
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
