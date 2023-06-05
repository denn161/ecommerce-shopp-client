import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

export type TFeadBackInputs ={
	  name:string 
		email:string 
		phone:string 
		message:string 
}


export interface IFeadBackInput {
	 register:UseFormRegister<TFeadBackInputs>,
	 errors:Partial<FieldErrorsImpl<TFeadBackInputs>>
	 mode:'dark'|'light'
}
