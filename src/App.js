import './App.css';
import Aside from './components/aside';
import { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import SelectPlan from './components/SelectPlan';
import AddOnes from './components/AddOnes';
import Summary from './components/Summary';
import validator from 'validator';
import Submitted from './components/Submitted';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    personalInfo: {},
    plan: {
      name: "Arcade",
      price: 9  
    },
    billing: false,
    addOns: [
      { "Online service": { selected: true, price: 1 } },
      { "Larger storage": { selected: false, price: 2 } },
      { "Customizable profile": { selected: false, price: 2 } }
    ]
  });

  const steps = [
    { name: "Personal Info", component: PersonalInfo },
    { name: "Select Plan", component: SelectPlan },
    { name: "Add Ones", component: AddOnes },
    { name: "Summary", component: Summary }
  ];

  const updateFormData = (stepData) => {
    setFormData(prevData => ({ ...prevData, ...stepData }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validatePersonalInfo();
    if (!isValid) {
      const confirmReset = window.confirm("You have not completed the first step. Would you like to go back to correct your answers?");

      if (confirmReset) {
        setCurrentStep(0);
      }
      return; 
    }
    setIsSubmitted(true)
  };

  const validatePersonalInfo = () => {
    const { name, email, phone } = formData.personalInfo;
    let newErrors = {};

    if (!name || name.trim() === '') {
      newErrors.name = "This field is required";
    }

    if (!email || email.trim() === '') {
      newErrors.email = "This field is required";
    } else if (!validator.isEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phone || phone.trim() === '') {
      newErrors.phone = "This field is required";
    } else if (!validator.isNumeric(phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number must contain only numbers";
    } else if (phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = "Phone number is too short";
    } else if (phone.replace(/\D/g, '').length > 11) {
      newErrors.phone = "Phone number is too long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 0) {
      const isValid = validatePersonalInfo();
      if (!isValid) return;
    }
    setCurrentStep(currentStep + 1);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <main className="w-full min-h-screen bg-[var(--alabaster)] flex flex-col xl:flex-row md:justify-center items-center">
      <div className='md:hidden block w-full'>
        <Aside currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
      <div className='container w-[90%] md:w-[60%] lg:w-[60%] xl:w-[70%] 2xl:w-[60%] xl:h-[620px] h-[600px] md:h-[720px] bg-[var(--white)] flex flex-col sm:-mt-12 md:mt-0 -mt-16 xl:flex-row rounded-lg shadow-lg p-4'>
        <div className='hidden md:block'>
          <Aside currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
        {!isSubmitted ? <div className='flex-1 pt-5 md:pt-8 xl:pt-12 py-7 md:px-[1.8rem] lg:px-[4.1rem] 2xl:px-[5.48rem] justify-center'>
          <div className='min-h-[95%] md:min-h-[92%] 2xl:min-h-[90%] '>
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
              setCurrentStep={setCurrentStep}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
          <div className={`flex ${currentStep > 0 ? "justify-between" : "justify-end"}`}>
            {currentStep > 0 &&
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className='text-[var(--cool-gray)] hover:text-[var(--marine-blue)] font-bold'
              >Go Back</button>
            }
            {currentStep < steps.length - 1 ?
              <button
                type="button"
                onClick={handleNextStep}
                className='py-3 w-[7.5rem] transform duration-100 rounded-[7px] bg-[var(--marine-blue)] text-[var(--alabaster)] hover:bg-[#174a8a]'
              >Next Step</button>
              :
              <button
                type="button"
                onClick={handleSubmit}
                className='py-3 w-[7.5rem] transform duration-100 rounded-[7px] bg-[var(--purplish-blue)] text-[var(--white)] hover:opacity-60'
              >Confirm</button>
            }
          </div>
        </div>
          :
          <Submitted />
        }
      </div>
    </main>
  );
}

export default App;
