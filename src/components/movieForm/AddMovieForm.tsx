"use client";

import { IGenre, IMovie, IPublisher } from "@/types/MovieForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getApiUrl } from "@/util/envVar";
import { getPublishers } from "@/util/api/getpublishers";
import { getGenres } from "@/util/api/getGenres";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
//TODO separate these. This component is getting too big.

export default function AddMovieForm() {
  // Error handling
  const [error, setError] = useState<{ genre?: string; publisher?: string }>(
    {}
  );

  const router = useRouter();
  const apiUrl = getApiUrl();

  const [publishers, setPublishers] = useState<IPublisher[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const publisherData = await getPublishers(apiUrl);
      setPublishers(publisherData);

      const genresData = await getGenres(apiUrl);
      setGenres(genresData);
    };

    fetchData();
  }, [apiUrl]);

  const [score, setScore] = useState(0);
  const roundToTwoDecimalPlace = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value) {
      value = parseFloat(value).toFixed(2);
    }
    setScore(Number(value));
  };

  const [selectedPublishers, setSelectedPublishers] = useState<string>("");
  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const publisherId = event.target.value;
    setSelectedPublishers(publisherId);

    if (publisherId != "") {
      setError((prev) => ({ ...prev, publisher: undefined }));
    }

    if (publisherId === "") {
      setError((prev) => ({ ...prev, publisher: "Please select a publisher" }));
    }
  };

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genreId = event.target.value;
    if (event.target.checked) {
      setSelectedGenres([...selectedGenres, genreId]);
    } else {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    }

    if (selectedGenres.length > 0) {
      setError((prev) => ({ ...prev, genre: undefined }));
    }

    if (selectedGenres.length === 0) {
      setError((prev) => ({
        ...prev,
        genre: "Please select at least one genre",
      }));
    }
  };

  const handleFormSubmit: SubmitHandler<IMovie> = async (data) => {
    const errorCheck: { genre?: string; publisher?: string } = {};

    if (selectedGenres.length === 0) {
      errorCheck.genre = "Please select at least one genre";
    }

    if (selectedPublishers === "") {
      errorCheck.publisher = "Please select a publisher";
    }

    if (Object.keys(error).length > 0) {
      setError(errorCheck); // Update error state and abort form submission.
      return;
    }

    const newData: IMovie = {
      ...data,
      score: Number(data.score),
      release_date: new Date(data.release_date).toISOString(),
      publisher: { id: selectedPublishers },
      genre: selectedGenres.map((id) => ({ id })),
    };

    const response = await fetch(`${apiUrl}/api/v1/movie/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      router.push("/movies/");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMovie>();

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="text-text glass-card flex min-w-full flex-col gap-4 p-12"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-step-1">
            Movie Title
          </label>
          <input
            className="rounded-md py-1 px-2 text-step-0 text-cardBackground"
            id="title"
            type="text"
            {...register("title", {
              required: "You need to fill out Movie Title",
            })}
          />
          <p className="text-red-500 text-step--1">{errors.title?.message}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="score" className="text-step-1">
            Movie Score
          </label>
          <input
            className="rounded-md py-1 px-2 text-step-0 text-cardBackground"
            id="score"
            type="number"
            step="0.1"
            placeholder="0"
            value={score}
            {...register("score", {
              required: "You need to fill out Movie Score",
              min: {
                value: 0,
                message: "At minimum a movie should have the score 0",
              },
              max: {
                value: 10,
                message: "At maximum a movie should have the score 10",
              },
              onChange: roundToTwoDecimalPlace,
            })}
          />
          <p className="text-red-500 text-step--1">{errors.score?.message}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="picture" className="text-step-1">
            Movie Picture URL
          </label>
          <input
            className="rounded-md py-1 px-2 text-step-0 text-cardBackground"
            id="picture"
            type="string"
            {...register("picture", {
              required: "You need to provice Picture URL",
            })}
          />
          <p className="text-red-500 text-step--1">{errors.picture?.message}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="releaseDate" className="text-step-1">
            Release Date
          </label>
          <input
            className="rounded-md py-1 px-2 text-step-0 text-cardBackground"
            id="release_date"
            type="date"
            {...register("release_date", {
              required: "You need to provide Movie Release Date",
            })}
          />
          <p className="text-red-500 text-step--1">
            {errors.release_date?.message}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-step-1" htmlFor="synopsis">
            Movie Synopsis
          </label>
          <textarea
            className="rounded-md py-1 px-2 text-step-0 text-cardBackground"
            id="synopsis"
            rows={5}
            {...register("synopsis", {
              required: "You need to provide Movie Synopsis",
            })}
          />
          <p className="text-red-500 text-step--1">
            {errors.synopsis?.message}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-step-1" htmlFor="publisher">
            Publisher
          </label>
          <select
            onChange={handleDropdownChange}
            className="rounded-md py-1 px-2 text-step-0 text-cardBackground"
            id="publisher"
            name="publisher"
          >
            <option value="">Select a publisher</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.publisher_name}
              </option>
            ))}
          </select>
          {error.publisher && <p className="text-red-500">{error.publisher}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-step-1">Genre</label>
          <div className="flex flex-wrap flex-row gap-4">
            {genres.map((genre) => (
              <div key={genre.id} className="flex flex-row gap-1">
                <input
                  type="checkbox"
                  id={genre.id}
                  name="genre"
                  checked={selectedGenres.includes(genre.id)}
                  onChange={handleCheckboxChange}
                  value={genre.id}
                />
                <label className="text-step--1" htmlFor={genre.id}>
                  {genre.genre}
                </label>
              </div>
            ))}
          </div>
          {error.genre && <p className="text-red-500">{error.genre}</p>}
        </div>

        <button
          type="submit"
          className="flex flex-row justify-center gap-2 mt-4 items-center bg-primary text-white py-2 px-4 rounded-md uppercase font-bold"
        >
          <p>Submit</p>
          <div className="max-w-full h-auto">
            <PaperAirplaneIcon className="w-5 h-5" />
          </div>
        </button>
      </form>
    </div>
  );
}
