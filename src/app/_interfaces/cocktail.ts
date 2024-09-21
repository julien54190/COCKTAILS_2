export interface ICocktail {
  id: number,
  user_id: number,
  nom: string,
  description: string,
  recette: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: null | string
}


export interface ISingleCocktail{
  data : ICocktail
}

export interface IDataCockail{
  data: ICocktail[]
}
