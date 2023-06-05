import Footer from '../modules/footer/Footer'
import Header from '../modules/header/Header'


interface ILayoutProps{
	 children:React.ReactNode
}

 const Layout=({children}:ILayoutProps)=>(   
	 <>
	  <Header/>
	{	children}
	<Footer/>
	 </>


)

export default Layout;