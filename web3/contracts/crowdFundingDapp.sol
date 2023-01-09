// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract crowdFundingDapp {
    struct Campaign {     //like an object in JS
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;//this will allow campaigns to be indexed like campaigns[0]

    //global variables

    uint256 public numberOfCampaigns = 0;


    //creates a campaign and returns the id of newly created campaign
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256){
        Campaign storage campaign = campaigns[numberOfCampaigns];

        //check to se if everything is good
        require(campaign.deadline < block.timestamp, " The deadline should be something in future!");

        campaign.owner = _owner;
        campaign.target = _target;
        campaign.description = _description;
        campaign.title = _title;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns-1;
    }

    //payable means we will send some cryptocurrency throughout this function
    function donateToCampaign(uint256 _id) public payable{
        uint256 amount = msg.value;//will send from frontend

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    // view means only returns some data
    function getDonators(uint256 _id) view  public returns (address[] memory, uint256[] memory){
        return(campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns()public view returns(Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for(uint i=0;i<numberOfCampaigns;i++){
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

}