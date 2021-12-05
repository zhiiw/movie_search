export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Film {
  id: number;
  title: string;
  ratings: number;
  release_date: string;

  actors:Actor[];
  director: Director;
  category :Category[];
  review:Review;
}

export interface Actor{
  id: number;
  name: string;
  birthDate: string;
  nation: string;
}

export interface Director{
  id: number;
  name: string;
  birthDate: string;
  nation: string;
}

export interface Category{
  id: number;
  name: string;
  description: string;
}

export interface Review{
  id: number;
  content: string;
  rating: number;
}