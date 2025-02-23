import AddMovieForm from "@/components/movieForm/AddMovieForm";
import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default async function AddMovies() {
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-row justify-between items-center py-4 border-b border-solid border-white/15">
        <p className="grow text-step-3">Add new movie</p>
        <div className="flex gap-4">
          <Link
            className="gap-2 bg-primary flex flex-row text-white items-center py-2 px-4 rounded-md text-step--1"
            href={"/movies/"}
          >
            <p className="grow">Go back home</p>
            <HomeIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <AddMovieForm />
    </div>
  );
}
