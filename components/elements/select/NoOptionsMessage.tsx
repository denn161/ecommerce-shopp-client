import { IOption } from '@/types/common'
import { GroupBase, NoticeProps,components } from 'react-select'
import Spinner from '../spinner/Spinner'


export const NoOptionsMessage = (props:NoticeProps<IOption,boolean,GroupBase<IOption>>) => {
	return (
		<components.NoOptionsMessage {...props}>
			<span>Ничего не найдено</span>
		</components.NoOptionsMessage>
	)
}

export const NoOptionsSpinner =(props:NoticeProps<IOption,boolean,GroupBase<IOption>>)=>{     
   return (
		<components.NoOptionsMessage {...props}>
		  <Spinner/>
		</components.NoOptionsMessage>
	 )


}

