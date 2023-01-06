import React from 'react';
import AssetTypeImage from '../../Components/AssetTypeImage';
import CountryImage from '../../Components/CountryImage';

import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { setQuery, setResults, RoidResult } from "./roidSlice";

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

interface ResultProps {
  result: RoidResult;
}

const RoidedResultCard: React.FC<ResultProps> = ({ result }: ResultProps) => {
  return (
    <>
      <div className='main-horizontal-wrapper-roids'>
        <div className='horizontal-wrapper'>
          <div className='vertical-wrapper lined'>
            <div>
              <AssetTypeImage src={result.assetTypeIconUrl} />
            </div>
            <div className='horizontal-wrapper'>
              <div>
                <p className='p-today'>{result.description}</p>
              </div>
              <div className='vertical-wrapper'>
                <div>
                  <p className='p-today'>{result.symbol} </p>
                </div>
                <div>
                  <p className='p-today'>&#8226;</p>
                </div>
                <div>
                  <CountryImage src={result.exchange.country.flagIconUrl}/>
                </div>
                <div>
                  <p className='p-today'>&#8226;</p>
                </div>
                <div>
                  <p className='p-today'>{result.assetType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='lined'>
          <div>
            <p className='p-today'>Exchange: {result.exchange.mic}</p>
            <p className='p-today'>State: {result.exchange.state} ({result.exchange.nextState} in {result.exchange.nextStateHours} hours)</p>
          </div>
        </div>
        <div className='lined'>
          <div>
            <p className='p-today'>Positions: {result.numPositions}</p>
          </div>
        </div>
        <div className='lined'>
          <Sparklines data={result.sparkLine} svgHeight={80} limit={30}>
            <SparklinesLine color="#56b45d" />
            <SparklinesSpots size={1}
              style={{ stroke: "#56b45d" }} />
          </Sparklines>
        </div>
        
      </div>
    </>
  )
}


interface ResultListProps {
  results: RoidResult[];
}


const ResultList: React.FC<ResultListProps> = ({ results }: ResultListProps) => {
  if (results) {
    if (results.length > 0) {
      const renderedResults = results.map((r: RoidResult) => {
        return (
          <div key={r.symbol + "-" + r.assetType}>
            <RoidedResultCard result={r} />
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


const SearchOnRoids: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state: RootState) => state.roid.query);
  const results = useAppSelector((state: RootState) => state.roid.results);
  const token = useAppSelector((state: RootState) => state.auth.token);
  const onChange = (event: any) => {
    dispatch(setQuery(String(event.target.value)));

    const QUERY = `query{
        instruments(search:\"${event.target.value}\") {
            sparkLine(num: 30)
            numPositions
            description
            symbol
            assetTypeIconUrl
            assetType
            exchange{
              country{
                flagIconUrl
              }
              mic
              name
              state
              open
              nextState
              nextStateHours
              nextStateMins
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

    // http://127.0.0.1:8000/api https://saxo-graph.deta.dev/api

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

export default SearchOnRoids