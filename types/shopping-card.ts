export interface IShoppingCard{
	 id:number
	 name:string 
	 price:number 
	 count:number 
	 image:string 
	 in_stock:number 
	 userId:number 
	 partId:number 
	 parts_manufacturer:string 
	 boiler_manufacturer:string 
	 total_price:number
}

export interface IAddToCartFx {
  url: string
  username: string
  partId: number
}