// import useSWR from "swr";

// const useFetchImages = () => {
//   const url = "https://challenge-uno.vercel.app/api/images";

//   const fetcher = (url: string | URL | Request) =>
//     fetch(url).then((res) => res.json());

//   const swrResult = useSWR(url, fetcher);

//   if (swrResult.error)
//     return <div>An error occurred while fetching images.</div>;
//   if (swrResult.isLoading) return <div>Loading...</div>;

//   const { data, error, isLoading } = swrResult;

//   return { data, error, isLoading };
// };

// export default useFetchImages;
