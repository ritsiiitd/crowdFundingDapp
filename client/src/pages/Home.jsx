import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'

import { DisplayCampaign } from '../components'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract_, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    console.log("Fetching");
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(()=>{
    if(contract_) fetchCampaigns();
  },[address, contract_])

  return (
    <DisplayCampaign 
      title = "All Campaigns"
      isLoading = {isLoading}
      campaigns = {campaigns}
    />
  )
}

export default Home