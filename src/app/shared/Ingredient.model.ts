export class Ingredient {
  // Create injected attributs for the model class behind the scenes using public <attribut>: <type> in the constructor
  constructor(public id: number, public name: string, public amount: number){}

}
