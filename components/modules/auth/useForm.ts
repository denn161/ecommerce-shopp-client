import { signUP } from '@/app/api/auth'
import { IInputs } from '@/types/auth'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useSwitch } from '../../screens/useSwitch'




export const useFormAction = (mode:'login'|'register')=>{
 const [loading,setLoading] =useState(false) 
 const {action:{switchForm}} =useSwitch()
  
 const {
	handleSubmit,
	register,
	formState: { errors },
	resetField
} = useForm<IInputs>({
	 mode:'onChange'
})
const onSubmit: SubmitHandler<IInputs> =async (data) => {
	     if(mode==='register'){
				
			 }

		try {
			setLoading(true)
			const userData = await signUP({url:'/users/register',username:data.name,email:data.email,password:data.password})
			resetField('name')
			resetField('email')
			resetField('password')
			switchForm()
			setLoading(false)
			console.log(userData)
		} catch (error) {			
			 toast.error((error as Error).message)
		}finally{
			setLoading(false)
		}

}






}