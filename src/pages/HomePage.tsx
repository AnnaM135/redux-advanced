import { useState, useEffect } from "react";
import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api";

export function HomePage() {
  const [search, setSearch] = useState("");
  const [dropdawn, setDropdawn] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

  useEffect(() => {
    setDropdawn(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username)
    setDropdawn(false)
  }

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen">
      {isError && <p className="text-center text-red-600">Somthing wrong...</p>}
      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdawn && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll shadow">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
            {areReposLoading && <p className="text-center">Repos Loading...</p>}
            { repos?.map(repo => <RepoCard repo={repo} key={repo.id} />) }
        </div>
      </div>
    </div>
  );
}
