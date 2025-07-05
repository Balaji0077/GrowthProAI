import {useState} from "react"
import { IoMdCloseCircle } from "react-icons/io"
import "./index.css"

const DisplayCard = (props)=>{

    const [isLoading,setLoading] = useState(false);
    const {rating,reviews,headline} = props.details;
    const {name,location} = props.company;
    const [baseHeadline,setHeadline] = useState(headline)
    const changeHeadline = async()=>{
        setLoading(true);
        const response = await fetch(`https://growthproai-backend-a6fu.onrender.com/regenerate-headline?name=${name}&location=${location}`);
        const data = await response.json();
        if(response.ok){
            setTimeout(()=>{
                setLoading(false);
            },1000)
            setHeadline(data);
            
        }
    }

    const closeDisplay = ()=>{
        window.location.reload();
    }
    
    return (
        <div className="responsive-card-container w-1/2 h-fit bg-gradient-to-br from-indigo-50 to-purple-100 border border-purple-200 rounded-2xl p-6 sm:p-8 shadow-xl">
                        <div>
                              <IoMdCloseCircle className="close-icon sm:mb-3 md:mb-0" onClick={closeDisplay}/>      
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-8 text-center">
                            Insights for <span className="text-blue-600">{name}</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center flex flex-col items-center justify-center">
                                <p className="text-gray-600 text-lg sm:text-xl font-medium mb-2">Google Rating</p>
                                <p className="text-5xl sm:text-6xl font-extrabold text-green-600 flex items-center">
                                    {rating} <span className="text-yellow-500 ml-2">★</span>
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center flex flex-col items-center justify-center">
                                <p className="text-gray-600 text-lg sm:text-xl font-medium mb-2">Number of Reviews</p>
                                <p className="text-5xl sm:text-6xl font-extrabold text-indigo-600">
                                    {reviews}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center mb-8">
                            <p className="text-gray-600 text-lg sm:text-xl font-medium mb-3">AI-Generated SEO Headline</p>
                            <p className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                               {
                               isLoading?<div className="flex items-center justify-center space-x-1 mt-4 text-lg font-large text-gray-900">
                                          <span className="animate-pulse text-4xl">.</span>
                                          <span className="text-4xl animate-pulse [animation-delay:.1s]">.</span>
                                           <span className="text-4xl animate-pulse [animation-delay:.2s]">.</span>
                                        </div> : baseHeadline
                               }
                            </p>
                        </div>
                         
                        <div className="regenerate-container">
                            <button className="button-regenerate bg-indigo-500" onClick={changeHeadline}>
                               { isLoading?'Regenerating...':'Regenerate SEO Headline'}
                            </button>
                        </div> 
        </div>                
    )
}

export default DisplayCard