import { ParsedUrlQuery } from 'querystring'

export interface IBradCrumbs{
	getTextGenerator:(param:string, query:ParsedUrlQuery) => void,
  getDefaultTextGenerator:(path:string,href:string) => string
}