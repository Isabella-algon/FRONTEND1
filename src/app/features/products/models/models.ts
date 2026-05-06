export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  subcategory: string;

  // lo que quieres mostrar en card
  family: string;

  //  lo que va en el modal
  mechanism: string;
  laboratory: string;
  concentration: string;
  form: string;
  dosage: string;
  notes: string;

  favorite?: boolean;
}