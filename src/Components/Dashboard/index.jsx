import {useState} from "react"
import DisplayCard from "../DisplayCard"
import "./index.css"

const DashBoard = ()=>{
    const [data,setData] = useState({})
    const [availableData,setAvailableData]=useState(false)
    const [input,setInput] = useState({name:'',location:''})
    const [loading,setLoading] = useState(false)
    const [name,setNameCheck] = useState(false)
    const [location,setLocationCheck] = useState(false)
    const nameInput = (event)=>{
        
       if(event.target.value.length>0){
         setNameCheck(false);
       }
       setInput((prev)=>{
         return {...prev,name:event.target.value}
       })
       
    }

    const locationInput = (event)=>{
         if(event.target.value.length>0){
          setLocationCheck(false)
         }
          setInput((prev)=>{
         return {...prev,location:event.target.value}
       })
       
    }

    const formSubmitted = async (event)=>{
         event.preventDefault();
         if(input.name==="" && input.location===""){
           setNameCheck(true);
           setLocationCheck(true);
         }
         if(input.name==="")
         {
          setNameCheck(true);
         }
         else if(input.location===""){
            setLocationCheck(true);
         }
         else 
         {
         setLoading(true);
         const options = {
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(input)
         }
         const  response = await fetch("https://growthproai-backend-a6fu.onrender.com/business-data",options);
         const data = await response.json();
         
         if(response.ok){
           setData(data);
           setLoading(false);
           setAvailableData(true);
         }
        }
    }
    const nameCheck = (event)=>{
         if(event.target.value===""){
            setNameCheck(true);
         }
         else{
          setNameCheck(false);
         }
    }
    const locationCheck = (event)=>{
         if(event.target.value===""){
            setLocationCheck(true);
         }
         else{
          setLocationCheck(false);
         }
    }
    return (
        <>
          <div className="min-h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center md:p-5 xl:p-0">
            {
             availableData?
                <DisplayCard details={data} company={input}/>
              :  
               <div className="responsive-white-container bg-white rounded-lg shadow-2xl w-1/2 p-8 flex-col items-center">
                  <h1 className="text-fuchsia-700 text-center font-semibold mb-5 text-xs text-shadow-2xs">Business Insight Dashboard</h1>
                  <div>
                    <form onSubmit={formSubmitted}>
                        <div className="flex flex-col m-4">
                            <label htmlFor="name" className="font-medium text-2xl mb-1">Business Name</label>
                            <input onChange={nameInput} onBlur={nameCheck} type="text" id="name" placeholder="e.g., 'Artisan Bakehouse'" className="mt-1 block w-full px-5 py-2 border border-gray-500 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-lg placeholder-gray-400 transition duration-200"/>
                            <p className="text-red-800">{name?"*Required":""}</p>
                        </div>
                        <div className="flex flex-col m-4">
                            <label htmlFor="location" className="font-medium text-2xl mb-1">Location</label>
                            <input onChange={locationInput} onBlur={locationCheck} type="text" id="location" placeholder="e.g., 'Mumbai, Hyderabad, Delhi'" className="mt-1 block w-full px-5 py-2 border border-gray-500 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-lg placeholder-gray-400 transition duration-200"/>
                            <p className="text-red-800">{location?"*Required":""}</p>
                        </div>
                        <div className="flex flex-col m-3 mt-8">
                        {   loading?
                            
                                  <div className="flex justify-center items-center mt-4 w-full text-xl bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out ">
                                     <div className="w-8 h-8 border-4 border-white-500 border-t-transparent rounded-full animate-spin">
                                        
                                     </div>
                                     <p className="ml-2">Processing...</p>
                                  </div>
                        
                             :
                            <button
                             type="submit"
                            className="w-full text-xl bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out ">
                              <span className="text-2xl">Analyze Business</span>
                            </button>
                         }
                        </div>
                    </form>
                  </div>
                  
               </div>
             } 
          </div>
        </>
    )
}

export default DashBoard