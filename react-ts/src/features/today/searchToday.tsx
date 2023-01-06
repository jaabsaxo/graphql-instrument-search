import React from 'react';
import AssetTypeImage from '../../Components/AssetTypeImage';
import CountryImage from '../../Components/CountryImage';

import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { setQuery, setResults, TodayResult } from "./todaySlice";

interface ResultProps {
  result: TodayResult;
}

const TodayResultCard: React.FC<ResultProps> = ({ result }: ResultProps) => {
  return (
    <>
      <div className='main-wrapper-today'>
        <div className='sub-wrapper-today'>
          <AssetTypeImage src={result.assetTypeIconUrl} />
        </div>
        <div className='sub-wrapper-today'>
          <p className='p-today'>{result.description}</p>
          <br></br>
          <div className='sub-wrapper-today-details'>
            <div>
              <p className='p-today'>{result.symbol}</p>
            </div>
            <div>
              <CountryImage src={result.exchange.country.flagIconUrl} />
            </div>
            <div>
              <p className='p-today'>{result.assetType}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


interface ResultListProps {
  results: TodayResult[];
}


const ResultList: React.FC<ResultListProps> = ({ results }: ResultListProps) => {
  if (results) {
    if (results.length > 0) {
      const renderedResults = results.map((r: TodayResult) => {
        return (
          <div key={r.symbol+"-"+r.assetType}>
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
  const onChange = (event: any) => {
    dispatch(setQuery(String(event.target.value)));

    const QUERY = `query{
        instruments(search:\"${event.target.value}\") {
            description,
            symbol,
            assetTypeIconUrl,
            assetType,
            exchange{
              country{
                flagIconUrl
              }
            }
          }
        }`

    const Options: any = {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {}
      }),
      redirect: 'follow'
    };

    fetch("https://saxo-graph.deta.dev/api", Options).then(response => response.json()).then(result => {
      dispatch(setResults(result));
    }).catch(error => console.log('error', error));
  }

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={onChange}
      />
      <ResultList results={results} />
    </>
  )
}

export default SearchToday