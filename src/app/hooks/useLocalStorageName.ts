import useSWR from "swr";

function useLocalStorageName(key: string, initialValue: any) {
  const { data: name, mutate } = useSWR(key, {
    fallbackData: initialValue,
    revalidateOnFocus: false,
  });

  const setName = (newName: string) => {
    localStorage.setItem(key, newName);
    mutate(newName);
  };

  return [name, setName];
}
export default useLocalStorageName;
