import React from 'react'

const Aside = ({ currentStep, setCurrentStep }) => {
  const steps = [
    { number: 1, title: 'YOUR INFO', subtitle: 'Step 1' },
    { number: 2, title: 'SELECT PLAN', subtitle: 'Step 2' },
    { number: 3, title: 'ADD-ONS', subtitle: 'Step 3' },
    { number: 4, title: 'SUMMARY', subtitle: 'Step 4' }
  ]

  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber - 1);
  }

  return (
    <aside className='bg-mobile-aside xl:bg-desktop-aside bg-center bg-cover xl:rounded-xl h-full xl:w-[22rem] py-20 md:p-12 mt-0 min-h-[2rem] xl:px-10'>
      <div className='rounded-lg flex xl:flex-col justify-center xl:justify-normal left-0 right-0 gap-6 md:gap-14 xl:gap-8 fixed md:static top-6'>
      {steps.map((step) => (
        <button
          key={step.number}
          onClick={() => handleStepClick(step.number)}
          className='flex gap-4 text-left cursor-pointer xl:w-full hover:opacity-90'
        >
          <div
            className={`w-10 h-10 rounded-full border border-[var(--white)] flex justify-center items-center ${
              currentStep === step.number - 1 ? 'bg-[var(--light-blue)] text-[var(--marine-blue)]' : 'text-[var(--white)]'
            }`}
          >
            <p className='font-bold'>{step.number}</p>
          </div>
          <div className='hidden xl:block'>
            <p className='text-[var(--light-gray)] text-sm uppercase'>{step.subtitle}</p>
            <p className='text-[var(--white)] font-bold tracking-widest'>{step.title}</p>
          </div>
        </button>
      ))}
      </div>
    </aside>
  )
}

export default Aside
  