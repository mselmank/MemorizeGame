import { Key } from "react";
import useSWR from "swr";

const useFetchImages = () => {
  const url = "https://challenge-uno.vercel.app/api/images";

  const fetcher = (url: string | URL | Request) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(url, fetcher);
  // console.log("🚀 ~ useFetchImages ~ data:", data);

  if (error) return <div>An error occurred while fetching images.</div>;
  if (isLoading) return <div>''</div>;

  return (
    <div>
      {data.map(
        (imageUrl: string | undefined, index: Key | null | undefined) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} />
        )
      )}
    </div>
  );
};

export default useFetchImages;
