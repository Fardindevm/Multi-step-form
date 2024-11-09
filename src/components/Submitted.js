import React from 'react'
import thank_you from '../assets/images/icon-thank-you.svg'

const Submitted = () => {
  return (
    <div className='flex-1 flex flex-col text-center px-[5.48rem] justify-center items-center gap-8 h-[100%]'>
      <img src={thank_you} alt='thank-you-icon' />
      <div className='flex flex-col gap-3'>
        <h1 className='text-4xl font-bold text-[var(--marine-blue)]'>Thank you!</h1>
        <p className='text-[var(--cool-gray)]'>
          Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at @support@loremgaming.com.
        </p>
      </div>
    </div>
  )
}

export default Submitted
