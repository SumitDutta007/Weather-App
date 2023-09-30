import axios from 'axios'
import { useState } from 'react';
import './App.css';
import { BiSearch } from 'react-icons/bi';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [city_name, setCity_name] = useState('')
  const [data, setData] = useState('')
  
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`
  
  const findWeateher = async () => {
    try {
      const res = await axios.get(url)
      setData(res.data);
      setCity_name('')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App bg-[url(./Images/basic-bg.jpg)] bg-cover bg-no-repeat bg-center h-screen">
      <input type="text" 
      placeholder='Enter Location' 
      value={city_name} 
      onChange={(e)=>{
        setCity_name(e.target.value)
      }}
      className='bg-[rgb(0,0,0,0.5)] rounded-full px-3 h-12 my-8 mx-4 w-[35%] text-white'
      onKeyPress={(e)=>{if(e.key === 'Enter'){findWeateher()}}}
      />
      
      {data?<>
      <div className="header">
        <header className='text-white text-7xl font-bold'>{data.name}</header>
        <header className='temp text-white mb-4 text-6xl font-bold'>{(data.main.temp - 273.00).toFixed(2)}°C</header>
      </div>


        <div className="body-icon h-60 flex flex-col justify-center items-center">
          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" srcset="" />
          <p className='text-5xl text-white h-20 font-bold'>{data.weather[0].main}</p>
        </div>


      <div className="footer mt-4 bg-[rgb(0,0,0,0.3)] h-40 w-[85%] m-auto rounded-3xl flex justify-evenly">
        <div className="feels  text-3xl font-bold flex flex-col">
          <p className='text-white'>Feels Like</p>
          <p>{(data.main.feels_like - 273).toFixed(2)} °C</p>
        </div>
        <div className="humid  text-3xl font-bold flex flex-col">
          <p className='text-white'>Humidity</p>
          <p>{data.main.humidity}%</p>
        </div>
        <div className="wind  text-3xl font-bold flex flex-col">
          <p className='text-white'>wind</p>
          <p>{(data.wind.speed * 18/5).toFixed(2)} Kmph</p>
          </div>
      </div>
      </>:null}

    </div>
  );
}

export default App;
