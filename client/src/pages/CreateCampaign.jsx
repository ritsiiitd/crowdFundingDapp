import React, {useState} from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';


const CreateCampaign = () => {
  const navigate = useNavigate();//called a hook
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name:'',
    title:'',
    description:'',
    target:'',
    deadline:'',
    image:''
  });

  const handleSubmit = (e) =>{
    e.preventDefault();//prevents browser to reload the page
    console.log(form);
  }

  const handleFormFieldChange = (fieldName, e) =>{//in event of inputting something in the form
    setForm({...form, [fieldName]:e.target.value})
  }

  return (
    <div className=' bg-[#1c1c24] mt-8 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && 'Loader...'}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] '>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white '>Start a Campaign</h1>
      </div>
      <div className='w-full flex justify-start items-center mt-4 p-4 bg-[#b36dfdfe] h-120px rounded-[10px]'>
            <img src={money} alt="money" className='w-[40px] h-[40px] object-contain' />
            <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>You will get 100% of the raised amount this website is p2p :3 </h4>
      </div>

      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px] '>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            labelName="Your Name *"
            placeholder="Johnny"
            inputType="text"
            value={form.name}
            handleChange={(e)=> handleFormFieldChange('name', e)} //used 'name' bcoz its form.name
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="title"
            inputType="text"
            value={form.title}
            handleChange={(e)=> handleFormFieldChange('title', e)}
          />
        </div>
        <FormField 
            labelName="Your story *"
            placeholder="write about your campaign"
            isTextArea
            value={form.description}
            handleChange={(e)=> handleFormFieldChange('description', e)}
          />
        
        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            labelName="Target *"
            placeholder="ETH ##"
            inputType="text"
            value={form.target}
            handleChange={(e)=> handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e)=> handleFormFieldChange('deadline', e)}
          />
        </div>
        <FormField 
            labelName="Campaign Image *"
            placeholder="Place image URL"
            inputType="url"
            value={form.image}
            handleChange={(e)=> handleFormFieldChange('image', e)}
          />

        <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton 
            btnType="submit"
            title="Start the campaign"
            styles="bg-[#1dc071]"
          />
        </div>
        
          
      </form>

    </div>
  )
}

export default CreateCampaign