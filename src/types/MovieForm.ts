export interface IGenre {
  id: string;
  genre?: string
}

export interface IPublisher {
  id: string;
  publisher_name?: string
}

export interface IMovie {
  id: string;
  title: string;
  score: number;
  picture: string;
  release_date: string;
  synopsis: string;
  publisher: IPublisher;
  genre: IGenre[];
}
