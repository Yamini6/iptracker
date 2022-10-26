//https://geo.ipify.org/api/v2/country,city?
//apiKey=at_TCm5mytkeENrHvcueWNYrG9oTMkSX&ipAddress=8.8.8.8
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import './App.scss';
import arrow from "./images/icon-arrow.svg"
import bgimg from "./images/pattern-bg.png"
import Markerposition from './Markerposition';


function App() {
  const [address, setAddress]=useState(null)
  const [ipadress, setIpAddress]= useState("")
  const checkIpAddress =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
const checkDomain =
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/

  
  useEffect(() => {
 try{
  const getApiData = async () => {
   // https://geo.ipify.org/api/v2/country?apiKey=at_vBuztugI9osZiTOvQwCZsdsXaZUi8&ipAddress=8.8.8.8
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_vBuztugI9osZiTOvQwCZsdsXaZUi8&ipAddress=8.8.8.8`)
    const data = await res.json()
    setAddress(data)
  }
  getApiData()
 }
 catch(error) {
     console.trace(error)
 }

  },[])
 
  const getEnterAddress = async () =>{
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_vBuztugI9osZiTOvQwCZsdsXaZUi8&${
        checkIpAddress.test(ipadress)
          ? `ipAddress=${ipadress}`
          : checkDomain.test(ipadress)
          ? `domain=${ipadress}`
          : ""
      }`
      // https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=8.8.8.8&domain=google.com
    )
    const data = await res.json()
    setAddress(data)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    getEnterAddress()
    setIpAddress("")
  }
  return (
    <div >
      <section>
        <div className='total-wrapper'>
          <img src={bgimg} alt="" className='img-bg' /> 
        </div>
        <article className='article-class-wrapper'>
          <h1 className='h1-ip'> Ipaddress Traker</h1>
          <form onSubmit={handleSubmit}> 
            <input type="text" name="ipaddress" placeholder="search" className="input-tag"
            value={ipadress}
            onChange={(e) => setIpAddress(e.target.value)}
            required/>
            <button  className="btn-ip" type='submit'>
            <img src={arrow} alt="" className='img-arrow'/></button>

          </form>
        </article>
      {address && <div>
        <article className='article-wrapper' >
          <div className='article-display-wrapper1'>
            <div className='border-1'>
            <h2> IP Address</h2>
            <p>
            {address && address.ip}
            </p>
            </div>
        
          </div>
          <div className='article-display-wrapper2'>
          <div className='border-1'>
            <h2> LOCATION</h2>
            <p>
             {address && address.location && address.location.city},{address && address.location && address.location.country}
            </p>
            </div>
        
          </div>
          <div className='article-display-wrapper3'>
          <div className='border-1'>
            <h2> TIME ZONE</h2>
            <p>
           UTC- {address && address.location && address.location.timezone}
            </p>
            </div>
        
          </div>
          <div className='article-display-wrapper4'>
          <div className='border-1'>
            <h2> ISP</h2>
            <p>
            {address && address.location && address.location.region}
            </p>
            </div>
        
          </div>
        </article>
        <MapContainer center={[address.location.lat,address.location.lng]} zoom={13} 
        style={{height:"100vh", width:"100vw"}}
        scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  <Markerposition address={address}></Markerposition>
  </MapContainer>
      </div>}
      </section>
    </div>
  );
}

export default App;

