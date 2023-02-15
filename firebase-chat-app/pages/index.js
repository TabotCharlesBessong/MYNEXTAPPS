
import dynamic from "next/dynamic";

const  Home= () =>{
  return (
    <div className=''>
      <h1 className="text-4xl text-red-600 text-center" >Hello dude</h1>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home),{ssr:false})

