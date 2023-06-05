import { useEffect, useRef } from 'react'


const useDebounceDelay = (delay:number) => { 
	const handler  =useRef<ReturnType<typeof setTimeout>>() 
 

	useEffect(()=>{
		  clearTimeout(handler.current)
	},[])


		return (cb:VoidFunction)=>{
			 clearTimeout(handler.current) 
       handler.current =setTimeout(cb,delay)
			 
		}
}

export default useDebounceDelay