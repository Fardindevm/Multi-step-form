import React from 'react'

const Summary = ({formData, setCurrentStep }) => {
  const selectedAddOns = formData.addOns.filter(addon => {
    const key = Object.keys(addon)[0];
    return addon[key].selected;
  });

  const totalPrice = formData.plan.price + selectedAddOns.reduce((total, addon) => {
    const key = Object.keys(addon)[0];
    return total + addon[key].price;
  }, 0);

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-4xl font-bold text-[var(--marine-blue)]'>Finishing up</h1>
      <p className='text-[var(--cool-gray)]'>Double-check everything looks OK before confirming.</p>
      <div className='flex flex-col mt-6 gap-5 bg-[var(--alabaster)] w-full h-auto py-3 px-7 rounded-lg'>
        <div className='flex flex-row justify-between items-center'>
          <div>
            <p className='font-medium text-[var(--marine-blue)]'>
              {formData.plan.name} {formData.billing ? "(Yearly)" : "(Monthly)"}
            </p> 
            <button 
              className='text-[var(--cool-gray)] underline decoration-2 transform duration-200 decoration-gray-400 hover:text-[var(--purplish-blue)] hover:decoration-blue-800'
              onClick={() => setCurrentStep(1)}  
            >
              Change
            </button>
          </div>
          <p className='text-[var(--marine-blue)] font-bold'>${formData.plan.price}/{formData.billing ? "yr" : "mo"}</p>
        </div>
        <hr />
        <div>
          {selectedAddOns.map((addon, index) => {
            const key = Object.keys(addon)[0];
            return (
              <div key={index} className='flex flex-row justify-between items-center mb-3'>
                <p className='text-[var(--cool-gray)]'>{key}</p>
                <p className='text-[var(--marine-blue)]'>+${addon[key].price}/{formData.billing ? "yr" : "mo"}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='flex flex-row justify-between items-center mt-6 px-7'>
        <p className='text-[var(--cool-gray)]'>Total (per {formData.billing ? "year" : "month"})</p>
        <p className='text-[var(--purplish-blue)] font-bold text-xl'>+${totalPrice}/{formData.billing ? "yr" : "mo"}</p>
      </div>
    </div>
  )
}

export default Summary
