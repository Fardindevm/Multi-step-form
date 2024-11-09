import React from 'react'
import Arcade from '../assets/images/icon-arcade.svg'
import Advanced from '../assets/images/icon-advanced.svg'
import Pro from '../assets/images/icon-pro.svg'

const SelectPlan = ({ formData, updateFormData }) => {
  const { plan, billing } = formData;
  const plans = [
    { name: 'Arcade', icon: Arcade, monthly: 9, yearly: 90 },
    { name: 'Advanced', icon: Advanced, monthly: 12, yearly: 120 },
    { name: 'Pro', icon: Pro, monthly: 15, yearly: 150 }
  ]

  const handlePlanSelect = (selectedPlan) => {
    updateFormData({ 
      plan: {
        name: selectedPlan.name, 
        price: billing ? selectedPlan.yearly : selectedPlan.monthly 
      }
    });
  }
  
  const handleBilling = () => {
    const newBilling = !billing;
    
    // Update plan price
    const selectedPlan = plans.find(p => p.name === plan.name);
    const newPlanPrice = newBilling ? selectedPlan.yearly : selectedPlan.monthly;
  
    // Update add-ons prices
    const newAddOns = formData.addOns.map(addon => {
      const key = Object.keys(addon)[0];
      const currentPrice = addon[key].price;
      return {
        [key]: {
          ...addon[key],
          price: newBilling ? currentPrice * 10 : currentPrice / 10
        }
      };
    });
  
    updateFormData({ 
      billing: newBilling,
      plan: { ...plan, price: newPlanPrice },
      addOns: newAddOns
    });
  }
  
  

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-4xl  font-bold text-[var(--marine-blue)]'>
        Select your plan
      </h1>
      <p className='text-[var(--cool-gray)]'>
        You have the option of monthly or yearly billing. 
      </p>
      <div className='flex 2xl:flex-row flex-col mt-2 xl:mt-6 gap-5'>
        {plans.map((planOption) => (
          <div key={planOption.name} className='2xl:w-1/3 transform hover:scale-[1.04] duration-200'>
            <input 
              type="radio"
              id={planOption.name}
              name="plan"
              value={planOption.name}
              checked={plan && plan.name === planOption.name}
              onChange={() => handlePlanSelect(planOption)}
              className='hidden'
            />
            <label 
              htmlFor={planOption.name}
              className={`flex 2xl:flex-col md:max-h-[70px] xl:max-h-none items-center 2xl:items-start py-4 2xl:py-0 pl-5 2xl:min-h-[180px] border rounded-lg cursor-pointer transition duration-300 hover:border-[var(--purplish-blue)] ${
                plan && plan.name === planOption.name ? 'border-[var(--purplish-blue)] bg-[var(--alabaster)]' : ''
              }`}
            >
              <img 
                src={planOption.icon} 
                alt={`${planOption.name}-plan`}
                className='w-10 h-10 mr-7 2xl:mr-0 2xl:mt-5 2xl:mb-14'
              />
              <div className='flex-1'>
              <p className='text-[var(--marine-blue)] font-bold'>{planOption.name}</p>
              {!billing ? (
                <p className='text-[var(--cool-gray)]'>${planOption.monthly}/mo</p>
              ) : (
                <>
                  <p className='text-[var(--cool-gray)]'>${planOption.yearly}/yr</p>
                  <p className='hidden 2xl:block text-[var(--marine-blue)] text-sm mb-4'>2 months free</p>
                </>
              )}
              </div>
              {billing && <p className='2xl:hidden mr-5 mt-3 text-[var(--marine-blue)] text-sm mb-4'>2 months free</p>}
            </label>
          </div>
        ))}
      </div>
      <div className='flex flex-row justify-center items-center gap-5 bg-[var(--alabaster)] p-5 rounded-lg mt-3 xl:mt-6'>
        <p className={`transform duration-300 font-bold ${!billing ? 'text-[var(--marine-blue)]' : 'text-[var(--cool-gray)]'}`}>
          Monthly
        </p>
        <input 
          type='checkbox' 
          className='hidden' 
          id="plan-input" 
          name='monthly-yearly' 
          checked={billing}
          onChange={handleBilling}
        />
        <label 
          htmlFor='plan-input'
          className='relative w-12 h-6 bg-[var(--marine-blue)] rounded-full cursor-pointer transition-colors duration-300'
        >
          <span 
            className={`absolute w-4 h-4 bg-white rounded-full top-1 transform duration-300 ${
              billing ? 'left-7' : 'left-1'
            }`}
          ></span>
        </label>
        <p className={`transform duration-300 font-bold ${billing ? 'text-[var(--marine-blue)]' : 'text-[var(--cool-gray)]'}`}>
          Yearly
        </p>
      </div>
    </div>
  )
}

export default SelectPlan