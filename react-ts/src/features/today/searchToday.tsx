import React from 'react';
import AssetTypeImage from '../../Components/AssetTypeImage';
import CountryImage from '../../Components/CountryImage';

import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { setQuery, setResults, TodayResult } from "./todaySlice";

interface ResultProps {
  result: TodayResult;
}

export const TodayResultCard: React.FC<ResultProps> = ({ result }: ResultProps) => {
  return (
    <>
      <div className='today-card'>
        <div className='vertical-wrapper'>
          <div className='top-margin-assetlogo'>
            <AssetTypeImage src={result.assetTypeIconUrl} />
          </div>
          <div className='horizontal-wrapper'>
            <div>
              <p className='p-text'>{result.description}</p>
            </div>
            <div className='vertical-wrapper p-text-seconday '>
              <div>
                <p className='p-text'>{result.symbol} </p>
              </div>
              <div className='left-margin-5'>
                <CountryImage src={result.exchange.country.flagIconUrl} />
              </div>
              <div>
                <p className='p-text'>&#8226;</p>
              </div>
              <div>
                <p className='p-text'>{result.displayAssetType}</p>
              </div>
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
  console.log("new list")
  if (results) {
    if (results.length > 0) {
      const renderedResults = results.map((r: TodayResult) => {
        console.log("rs:", r.symbol)
        return (
          <div key={r.symbol + "-" + r.description + '-' + r.displayAssetType} className='bottom-margin'>
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
            description
            symbol
            assetTypeIconUrl
            displayAssetType
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