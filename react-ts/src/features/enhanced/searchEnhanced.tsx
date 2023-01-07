import React from 'react';
import AssetTypeImage from '../../Components/AssetTypeImage';
import CountryImage from '../../Components/CountryImage';

import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { TodayResultCard } from '../today/searchToday';
import { setQuery, setResults, EnhancedResult } from "./enhancedSlice";

interface ResultProps {
  result: EnhancedResult;
}


interface OpenCloseProps {
  open: string
}

const OpenClose: React.FC<OpenCloseProps> = ({ open }: OpenCloseProps) => {
  if (open === String(true)) {
    return (
      <>
        <div className='vertical-wrapper'>
          <div>
            <GreenDot />
          </div>
          <div>
            <p className='p-text p-text-seconday'>Open</p>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='vertical-wrapper'>
          <div>
            <RedDot />
          </div>
          <div>
            <p className='p-text p-text-seconday'>Closed</p>
          </div>
        </div>
      </>
    )
  }
}

const RedDot: React.FC = () => {
  return (
    <>
      <div className='red-dot'></div>
    </>
  )
}

const GreenDot: React.FC = () => {
  return (
    <>
      <div className='green-dot'></div>
    </>
  )
}

export const ExchangeResultCard: React.FC<ResultProps> = ({ result }: ResultProps) => {
  return (
    <>
      <div className='lined'>
        <div className='vertical-wrapper'>
          <div>
            <p className='p-text'>{result.exchange.name} ({result.exchange.mic})</p>
          </div>
          <div>
            <OpenClose open={result.exchange.open} />
          </div>
        </div>
        <div>
          <div>
            <div>
              <p className='p-text p-text-seconday'>Current: {result.exchange.state} </p>
            </div>
            <div>
              <p className='p-text p-text-seconday'>Next: {result.exchange.nextState} in {result.exchange.nextStateRemaining} hours</p>
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
          <div key={r.symbol + "-" + r.assetType}>
            <div>
              <TodayResultCard result={r} />
              <ExchangeResultCard result={r} />
            </div>
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
            description
            symbol
            assetTypeIconUrl
            assetType
            displayAssetType
            exchange{
              country{
                flagIconUrl
              }
              mic
              name
              state
              open
              nextState
              nextStateRemaining
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