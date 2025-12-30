import './App.css';
import { useState } from 'react';
function App() {
  let [city,setCity]=useState('');//state variable to store city name

  let [wDetail,setWDetail]=useState();//state variable to store weather details

  let [isLoading,setIsLoading]=useState(false);//state variable to manage loading state



  let getData=(event)=>{//function to fetch data from API
    setIsLoading(true);//updating loading state variable
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)//fetching data from API
    .then((res)=>res.json())//converting response to json
    .then((finalRes)=>{//final response
      if(finalRes.cod==404){
        setWDetail(undefined);//updating weather details state variable
      }
      else{
        setWDetail(finalRes);//updating weather details state variable
      }
      setIsLoading(false);//updating loading state variable
      
      //console.log(finalRes);
    })
    //console.log("Fetching data for city:", city);
    setCity('');
    event.preventDefault();
  }

  
  return (
    <div className="App">
      <div className='outerDiv'>
        <div className='innerDiv'>
          <h1>Simple Weather App</h1>
          <form onSubmit={getData}>
            <input type='text' placeholder='City Name'  value={city}  onChange={(event)=>setCity(event.target.value)}/><button className='btn'>Enter</button>
            {/* onChange event to update city name in state variable */}
          </form>

          <div className='innerDiv2'>

            <img src="https://media1.tenor.com/m/WX_LDjYUrMsAAAAC/loading.gif" className={isLoading ? 'activeGif' : 'gif'}  />

            {
              (wDetail)!==undefined?
            <>
              <h3>{wDetail.name} <span>{wDetail.sys.country}</span></h3>{/*displaying city name and country*/}
              <h2>{wDetail.main.temp}°C</h2>{/*displaying temperature*/}
                <img src={`http://openweathermap.org/img/w/${wDetail.weather[0].icon}.png`}/>{/*icon for weather condition*/}
            <p>{wDetail.weather[0].description}</p>
            </>
            :
            <>
              No Data!!
            </>
            }
             </div>
        </div>
      </div>
    </div>
  );
}

export default App;

