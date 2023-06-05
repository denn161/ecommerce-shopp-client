import { IGeolocation } from '@/types/common'
import { createEffect } from 'effector-next'
import instance from '../axiosClient'

 export const getLocationUserFx =createEffect(async({latitude,longitude}:IGeolocation)=>{

 const {data} =await instance.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,{withCredentials:false})
  
 return data


})