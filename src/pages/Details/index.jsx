import { IoArrowUndo } from "react-icons/io5";
import { useDetailsQuery } from "../../hooks/useCustomQuery";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader"

export function Details() {
  const { id } = useParams()

  const {data: details, isLoading, error} = useDetailsQuery(id)

  if (isLoading) return <div><Loader /></div>
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      <Link to='/'>
        <button className="absolute top-10 left-10 z-10">
          <IoArrowUndo className="size-10 hover:scale-125 transition duration-300 ease-in" />
        </button>
      </Link>

      <img
        src={details.imageBackdrop}
        className="absolute h-[60%] z-0 w-full opacity-30 object-cover"
        alt={details.title}
      />

      <div className="z-10 mb-20 pt-32 px-2 sm:px-12 space-y-20 md:space-y-0">
        <div className="z-10 flex flex-col md:flex-row items-center justify-center sm:space-y-0 space-y-10 space-x-12 md:h-[80vh]">
          <img
            src={details.imagePoster}
            alt={details.title}
            className="z-50 w-80 h-[520px] object-fit rounded-3xl mb-6 md:mb-0"
          />

          <div className="z-10 space-y-10 max-w-xl lg:max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-bold ">{details.title}</h1>

            <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-start sm:items-center lg:space-x-4">
              {details.genres.map((genre) => (
                <p
                  key={genre.id}
                  className="text-base lg:text-xl border-2 font-light border-white rounded-3xl px-6 py-1 mb-4 lg:mb-0 ml-4 lg:ml-0 "
                >
                  {genre.name}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <p className="max-w-2/5 text-base sm:text-xl mb-6">{details.overview}</p>
              <p>
                <span className="text-purple-600">Duração: </span>{" "}
                {details.runtime}min
              </p>
              <p>
                <span className="text-purple-600">Data de lançamento: </span>{" "}
                {details.release_date}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <iframe
            src={`https://www.youtube.com/embed/${details.videos.results[0]?.key}`}
            className="z-10 w-[95%] h-[430px] lg:w-[1000px] md:h-[680px] rounded-xl"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
