import React from 'react';
import AssetTypeImage from '../../Components/AssetTypeImage';
import CountryImage from '../../Components/CountryImage';

import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { setQuery, setResults, EnhancedResult } from "./enhancedSlice";

interface ResultProps {
  result: EnhancedResult;
}

const EnhancedResultCard: React.FC<ResultProps> = ({ result }: ResultProps) => {
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
            <div>
              <p className='p-today'>Exchange: {result.exchange.mic}</p>
              <p className='p-today'>State: {result.exchange.state} ({result.exchange.nextState} in {result.exchange.nextStateHours} hours)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


interface ResultListProps {
  results: EnhancedResult[];
}


const ResultList: React.FC<ResultListProps> = ({ results }: ResultListProps) => {
  if (results) {
    if (results.length > 0) {
      const renderedResults = results.map((r: EnhancedResult) => {
        return (
          <div key={r.symbol+"-"+r.assetType}>
            <EnhancedResultCard result={r} />
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


const SearchEnhanced: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state: RootState) => state.enhanced.query);
  const results = useAppSelector((state: RootState) => state.enhanced.results);
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
              mic,
              name,
              state,
              open,
              nextState,
              nextStateHours,
              nextStateMins,
              until
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

export default SearchEnhanced