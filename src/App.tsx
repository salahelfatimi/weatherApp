import axios from "axios";
import {  useEffect, useState } from "react";
import cloud from "./images/cloud.png"
import Clear from "./images/sany.png"
import run from "./images/run.png"

function App() {
 
  interface countries{
    country:string
    data:any
    iso2:string
    cities:string
  
  }
  interface wethers{
    name:string
    weather:any[]
    main:{feels_like:number}
  }
  const weatherObjet:wethers={name:"",weather:[{main:String}],main:{feels_like:0}}
  const countriesTablu:countries[]=[]

  
  
  const [wether,setWether]=useState(weatherObjet)
  const [show,setShow]=useState<boolean>(false)
  const [city,setCity]=useState<string[]>([])
  const [countries,setCountries]=useState(countriesTablu)

  const findCity=(event: React.ChangeEvent<HTMLSelectElement>)=>{
      const find=countries.filter((req)=>req.iso2===event.target.value)
      const cityAll = find.flatMap((citys) => citys.cities); //
      setCity(cityAll)
    
      
  }
  const getWeather=()=>{
    switch(wether.weather[0].main){
      case "Clouds":
        return cloud
      case "Clear":
        return Clear
      case "Rain":
        return run
      default:
        return ""
    }

  }
  const findWether=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    if(event.target.value==='nothing'){
      setShow(false)
    }
    else{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=863242cfb2b1d357e6093d9a4df19a4b`)
    .then((req)=>setWether(req.data))
    .catch((err)=>console.log(err))
    setShow(true)
    }
    }

  useEffect(()=>{
    axios.get<countries>('https://countriesnow.space/api/v0.1/countries')
    .then((req)=>setCountries(req.data.data))
    .catch((err)=>console.log(err))
},[])

 
  return (
    <>
    <div className="  p-2 h-screen items-center flex justify-center  ">
      <div className=" space-y-2 bg-[#8ecae6] p-6 rounded-2xl">
        <div className="space-x-2">
            <label htmlFor="country" className=" font-mono font-bold uppercase">Country</label>
            <select className=" font-mono p-1 rounded-lg" onChange={findCity}  name="country" id="country">
            <option defaultChecked>Choose Country</option>
              {countries.map((country,key)=>
              <option value={country.iso2} key={key}>{country.country}</option>
              )}
            </select>
        </div>
        
        <div className={`space-x-2 text-center ${city.length === 0 ? 'hidden ' : ''}`}>
            <label htmlFor="City" className=" font-mono font-bold uppercase">City</label>
            <select className=" font-mono p-1 rounded-lg"  name="City" id="City" onChange={findWether}>
              <option defaultChecked  value='nothing'>Choose City</option>
              {city.map((city,key)=>
              <option value={city} key={key}>{city}</option>
              )
              }
            </select>
        </div>
        <div className={` text-center ${show==true?'':'hidden'}`}>
              <div className=" uppercase  text-2xl text-white">{wether.name}</div>
              <div className="flex justify-center items-center "> 
                <img className="items-center" src={getWeather()} alt="" />
                
              </div>
              <div className=" flex items-center justify-center gap-2">
                <div className=" text-4xl font-mono font-bold text-white">{wether.main.feels_like==0?'': `${Math.floor(wether.main.feels_like - 273.15)}°`}</div>
                <div className=" text-2xl  uppercase  text-white">{wether.weather[0].main}</div>
              </div>    
      </div>
      </div>
     

      
  

      </div>
    </>
  );
}

export default App;
