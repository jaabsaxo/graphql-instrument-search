import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { searchToday, setQuery, TodayResult } from "./todaySlice";


interface ResultProps {
  result: TodayResult;
}


const TodayResultCard: React.FC<ResultProps> = ({ result }: ResultProps) => {
  return (<p>{result.symbol}</p>)
}


interface ResultListProps {
  results: TodayResult[];
}


const ResultList: React.FC<ResultListProps> = ({ results }: ResultListProps) => {
  if (results.length > 0) {
    const renderedResults = results.map((r: TodayResult) => {
      return (
        <div key={r.symbol}>
          <TodayResultCard result={r} />
        </div>)
    });
    return (
      <>
        {renderedResults}
      </>
    )
  } else {
    return (
      <></>
    )
  }
}


const SearchToday: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state: RootState) => state.today.query);
  const results = useAppSelector((state: RootState) => state.today.results);
  const token = useAppSelector((state: RootState) => state.auth.token);
  const onClick = () => {
    const searchAction = {
      token: token,
      query: query
    }
    dispatch(searchToday(searchAction));
  }
  const onChange = (event: any) => {
    dispatch(setQuery(String(event.target.value)));
  }

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={onChange}
      />
      <button
        onClick={onClick}
      >Search
      </button>
      <ResultList results={results} />
    </>
  )
}

export default SearchToday