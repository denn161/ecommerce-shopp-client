
import { MutableRefObject, useRef } from 'react'
import styles from './AuthPage/Auth.module.scss'
export const useSwitch = ()=>{
	let switchCtn = useRef() as MutableRefObject<HTMLDivElement>
	const switchC1 = useRef() as MutableRefObject<HTMLDivElement>
	const switchC2 = useRef() as MutableRefObject<HTMLDivElement>
	const switchCircle1 = useRef() as MutableRefObject<HTMLDivElement>
	const switchCircle2 = useRef() as MutableRefObject<HTMLDivElement>
	const switchBtn =useRef() as MutableRefObject<HTMLDivElement>
	const aContainer = useRef() as MutableRefObject<HTMLDivElement>
	const bContainer = useRef() as MutableRefObject<HTMLDivElement>
  
	const switchForm = ()=>{		
		switchCtn.current.classList.add(styles.is_gs);
    setTimeout(function(){
        switchCtn.current.classList.remove(styles.is_gs);
    }, 1500)
    switchCtn.current.classList.toggle(styles.is_txr);
    switchCircle1.current.classList.toggle(styles.is_txr);
    switchCircle2.current.classList.toggle(styles.is_txr);

    switchC1.current.classList.toggle(styles.is_hidden);
    switchC2.current.classList.toggle(styles.is_hidden);
    aContainer.current.classList.toggle(styles.is_txl);
    bContainer.current.classList.toggle(styles.is_txl);
    bContainer.current.classList.toggle(styles.is_z200);


	}

	return {
		refs:{
			switchC1,switchC2,switchBtn,switchCtn,switchCircle1,switchCircle2,aContainer,bContainer 
		},
		action:{
			  switchForm
		}
	}



}