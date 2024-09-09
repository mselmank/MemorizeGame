import useSWR from "swr";

function useCachedName() {
  const { data: name, mutate: setName } = useSWR("userName", {
    fallbackData: "",
  });

  return [name, setName];
}
export default useCachedName;
