import React from 'react'
import checkMark from '../assets/images/icon-checkmark.svg'

const AddOnes = ({ formData, updateFormData }) => {
  const { billing, addOns } = formData;

  const addOnOptions = [
    { name: "Online service", title: "Online service", description: "Access to multiplayer games", monthlyPrice: 1, yearlyPrice: 10 },
    { name: "Larger storage", title: "Larger storage", description: "Extra 1TB of cloud save", monthlyPrice: 2, yearlyPrice: 20 },
    { name: "Customizable profile", title: "Customizable profile", description: "Custom theme on your profile", monthlyPrice: 2, yearlyPrice: 20 }
  ];
  
  const handleAddOnChange = (addOnName) => {
    const updatedAddOns = addOns.map(addon => {
      const key = Object.keys(addon)[0];
      if (key === addOnName) {
        return {
          [key]: {
            selected: !addon[key].selected,
            price: billing 
              ? addOnOptions.find(opt => opt.name === key).yearlyPrice 
              : addOnOptions.find(opt => opt.name === key).monthlyPrice
          }
        };
      }
      return addon;
    });
    updateFormData({ addOns: updatedAddOns });
  };

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-4xl font-bold text-[var(--marine-blue)]'>Pick add-ons</h1>
      <p className='text-[var(--cool-gray)]'>Add-ons help enhance your gaming experience.</p>
      <form className='flex flex-col mt-2 lg:mt-6 gap-5'>
        {addOnOptions.map((addOn) => {
          const currentAddon = addOns.find(addon => Object.keys(addon)[0] === addOn.name);
          const isSelected = currentAddon ? currentAddon[addOn.name].selected : false;
          return (
            <label key={addOn.name} 
              className={`py-5 px-6 border flex flex-row items-center gap-4 rounded-lg cursor-pointer transform duration-200 
                hover:border-[var(--marine-blue)] ${
                isSelected ? 'border-[var(--marine-blue)] bg-[var(--alabaster)]' : ''
              }`}
            >            
              <div className="relative w-5 h-5">
                <input 
                  type='checkbox' 
                  name={addOn.name}
                  checked={isSelected}
                  onChange={() => handleAddOnChange(addOn.name)}
                  className='appearance-none h-5 w-5 border-2 border-gray-300 rounded-md checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 cursor-pointer' 
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {isSelected && <img src={checkMark} alt="Checkmark" className='w-3 h-3' />}
                </div>
              </div>
              <div className='ml-2 flex-1'>
                <p className='text-[var(--marine-blue)] font-bold'>{addOn.title}</p>
                <p className='text-[var(--cool-gray)]'>{addOn.description}</p>
              </div>
              <p className='text-[var(--purplish-blue)]'>
                +${billing ? addOn.yearlyPrice + '/yr' : addOn.monthlyPrice + '/mo'}
              </p>
            </label>
          );
        })}
      </form>
    </div>
  )
}

export default AddOnes
