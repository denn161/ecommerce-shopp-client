import { IBoilerPart, IBoilerParts } from '@/types/boiler-parts'
import { createEffect } from 'effector-next'
import instance from '../axiosClient'


export const getNewBoilerPartsFx =createEffect(async(url:string)=>{

  const {data} =await instance.get<IBoilerParts>(url) 
	
	return data 
	

})

export const getBoilerPartsFx =createEffect(async(url:string)=>{

  const {data} =await instance.get<IBoilerParts>(url) 
	
	return data 
	

})


export const getBoilerPartFx =createEffect(async(url:string)=>{

  const {data} =await instance.get<IBoilerPart>(url) 
	
	return data 
	

})


export const searchPartFx = createEffect(async({url,search}:{url:string,search:string})=>{
    
	const {data} =await instance.post<IBoilerParts>(url,{search})

	return data


})

export const findProductByName=createEffect(async({url,name}:{url:string,name:string})=>{
	  
	  const {data} =await instance.post<IBoilerPart>(url,{name}) 

	  return data
})




