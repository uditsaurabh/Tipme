import React, { useEffect,useState } from 'react';
import Greeter from './artifacts/contracts/TipMe.sol/TipMe.json';
import { ethers } from 'ethers';
import {Button,Form} from 'react-bootstrap'
import TipTable from "./components/TipTable"

const contract_Deployment_Id = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

function App() {
  
  const[tips,setTips]=useState([])
  const[msg,setMessage]=useState()
  const [name,setName]=useState()
const [contract,setContract]=useState()
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchGreetings = async () => {
    try{let contractAddress = contract_Deployment_Id;
    const { ethereum } = window;

    if (!ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      Greeter.abi,
      signer
    );
    setContract(contract)
    console.log("The contract is",contract);
    const tips = await contract.GetTips();
    setTips(tips)
    console.log(tips);}
  catch(e){
    console.log("these are the exceptions",e.message)
  }
  };

  useEffect(() => {
    connectWallet();
    fetchGreetings();
  }, []);

  return (
    <div className='container'>
      <h1>Tip Me app</h1>
      <Form.Label htmlFor="inputPassword5">Enter Name</Form.Label>
      <Form.Control
        value={name}
        onChange={(e)=>setName(e.target.value)}
        type="text"
        id="inputPassword5"
        aria-describedby="Enter Name"
      />
      <Form.Label htmlFor="inputPassword6">Enter Message</Form.Label>
      <Form.Control
        value={msg}
        onChange={(e)=>setMessage(e.target.value)}
        type="text"
        id="inputPassword6"
        aria-describedby="Enter Message"
      />
      <Button className="mt-3" variant="success"
      onClick={()=>{contract.PayTip(msg,name)}}
      >Send Tip</Button>{' '}
      <TipTable arr={tips}/>
    </div>
  );
}

export default App;
