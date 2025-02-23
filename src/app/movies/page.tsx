import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { cookies } from "next/headers";
import { IMovie } from "@/types/MovieForm";
import { getApiUrl } from "@/util/envVar";
import { PlusIcon, StarIcon } from "@heroicons/react/16/solid";

export default async function Movies() {
  const apiUrl = await getApiUrl();
  const cookie = await cookies();
  const response = await fetch(`${apiUrl}/api/v1/movies/`, {
    method: "GET",
    headers: { Cookie: cookie.toString() },
    credentials: "include",
  });

  const movies = await response.json();

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-row justify-between items-center py-4 border-b border-solid border-white/15">
        <p className="grow text-step-3">Movies List</p>
        <div className="flex gap-4">
          <Link className="gap-2 bg-primary flex flex-row text-white items-center py-2 px-4 rounded-md text-step--1" href={"/movies/add/"}>
            <p className="grow">Add a new movie</p>
            <PlusIcon className="w-5 h-5" />
          </Link>

          <LogoutButton />
        </div>
      </div>

      <ul className="flex flex-col gap-4">
        {movies.map((movie: IMovie) => (
          <li className="flex flex-col glass-card px-6 py-8" key={movie.id}>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-step-2">{movie.title}</p>
              <p className="text-step-1">({movie.release_date.slice(0, 4)})</p>
            </div>
            <div className="flex flex-row gap-4 text-step--2 mb-4 opacity-80">
              <p>{movie.publisher.publisher_name}</p> 
              <div className="flex flex-row gap-1 items-center">
                <div className="max-w-full h-auto">
                  <StarIcon className="w-4 h-4 fill-yellow-300" />
                </div>
                <p>{movie.score} / 10</p>
              </div>
            </div>
            <p className="text-step-0">{movie.synopsis}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
