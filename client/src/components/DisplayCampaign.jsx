import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets'
import { Card } from "../components";

const DisplayCampaign = ({ title, isLoading, campaigns, profile, address }) => {
  
  const navigate = useNavigate();
  // console.log("address is ", addres );
  const handleNavigate = (campaign) =>{
    navigate(`/campaign-details/${campaign.title}`, { state: campaign}); //data can be passed via state directly to the navigated page
  }

  return (
    <div>
      <h1 className='font-epilogue, font-semibold text-[18px]
        text-white text-left'>{title} ({campaigns.length})</h1>
      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain' />
        )}

        {address && profile && !isLoading && campaigns.length === 0 && (
          <p className=' font-epilogue font-semibold 
          text-[14px] leading-[30px] text-[#818183] '>
            No campaigns created yet .
          </p>
        )}
        {profile && !address && (
          <p className=' font-epilogue font-semibold 
          text-[14px] leading-[30px] text-[#818183] '>
            Please connect your metamask wallet.
          </p>
        )}
        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => 
          <Card 
            key={campaign.id}
            {...campaign}
            handleClick={()=>handleNavigate(campaign)}
          />
        )}
      </div>
    </div>
  )
}

export default DisplayCampaign