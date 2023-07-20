//here comes the logic for interaction btw front end and smart contract_
import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import abi from "./contract-abi.json"
const StateContext = createContext();

//it is a regular react funtional component but it has children inside of props, so we can get those children
//that allows us to wrap entire application with the context provider but still render all of the children inside it
export const StateContextProvider = ({ children }) => {
    const user = new ethers.providers.Web3Provider(window.ethereum);
    // const contract_ = new ethers.Contract("0x3F8df76F2FF3E427b1A66c67f3291F2C29b3D971",abi,user)
    const {contract} = useContract_("0x3F8df76F2FF3E427b1A66c67f3291F2C29b3D971");
    console.log("contract_ is" ,contract);
    //how to call write functions of the contract_, but cann directly by contract_.func_name(parameters)
    const { mutateAsync: createCampaign } = useContract_Write(contract, "createCampaign");
    // const cp = await contract__.getCampaigns();
    const address = ethers.Wallet;
    const connect = useMetamask(); //now we have all we need to interact w our smart contract_
    console.log("Address is",address);

    const publishCampaign = async (form) => {
        // const user = new ethers.providers.Web3Provider(window.ethereum);
        // await user.send("eth_requestAccounts",[]);
        // const signer=await user.getSigner();
        // console.log("Signer",signer);
        // const contract_ = new ethers.Contract("0x3F8df76F2FF3E427b1A66c67f3291F2C29b3D971",abi,user,connect)
        // console.log("creating.........");
        try {
            const data = await createCampaign([address,//owner
                form.title, //campaign title
                form.description, //description
                form.target,
                new Date(form.deadline).getTime(), //deadline
                form.image
            ])
            console.log("Contract call worked!", data);
        } catch (error) {
            console.log("Contract call failed", error);
        }
        
    }

    const getCampaigns = async () => {
        console.log("Getting campaigns...");
        const campaigns = await contract.getCampaigns();
        console.log(campaigns);
        const parsedCampaigns = campaigns.map((campaign, i)=>({
            owner : campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }));
        return parsedCampaigns;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const myCampaigns = allCampaigns.filter((campaign)=>
        campaign.owner === address); 

        return myCampaigns;
    }

    const donate = async (pId, amount) => {
        const data = await contract.donateToCampaign(pId, {value: ethers.utils.parseEther(amount)});

        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract_.getDonators(pId);
        const numberOfDonations = donations[0].length;
        
        const parsedDonations = [];

        for(let i=0;i< numberOfDonations;i++){
            parsedDonations.push({
                donator : donations[0][i],
                donation : ethers.utils.formatEther(donations[1][i].toString())
            })
        }
        return parsedDonations;
    }

    return(
        //sharing this to all pages
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign, //renaming publishCampaign to createCampaign
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

// we will wrap our entire application with this context