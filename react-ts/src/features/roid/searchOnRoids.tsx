import React from 'react';
import AssetTypeImage from '../../Components/AssetTypeImage';
import CountryImage from '../../Components/CountryImage';

import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { setQuery, setResults, RoidResult } from "./roidSlice";

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { TodayResultCard } from '../today/searchToday';
import { ExchangeResultCard } from '../enhanced/searchEnhanced';

interface ResultProps {
  result: RoidResult;
}

const ExposureCard: React.FC<ResultProps> = ({ result }: ResultProps) => {
  if (result.positionInfo.positionExposure == 0) {
    return (
      <></>
    )
  } else {
    return (
      <>
        <div>
          <p className='p-text'>Exposure:</p>
          <p className='p-text p-text-seconday'>positions: {result.positionInfo.numPositions}</p>
          <p className='p-text p-text-seconday'>exposure: {result.positionInfo.positionExposure}</p>
          <p className='p-text p-text-seconday'>currency: {result.positionInfo.exposureCurrency}</p>
        </div>
      </>
    )
  }

}

interface SparkProps {
  data: Number[]
}

const Sparkline: React.FC<SparkProps> = ({ data }: SparkProps) => {
  if (data) {
    let color = "#fff"
    if (data[0] > data[data.length - 1]) {
      color = "#ff0000"
    } else {
      color = "#56b45d"
    }
    return (
      <>
        <p className='p-text'> Price the past 30 days</p>
        <Sparklines data={data} svgHeight={80} limit={30}>
          <SparklinesLine color={color} />
          <SparklinesSpots size={1}
            style={{ stroke: color }} />
        </Sparklines>
      </>
    )
  }
}

const RoidedResultCard: React.FC<ResultProps> = ({ result }: ResultProps) => {
  return (
    <>
      <div className='main-horizontal-wrapper-roids'>
        <TodayResultCard result={result} />
        <ExchangeResultCard result={result} />
        <div className='lined'>
          <ExposureCard result={result} />
        </div>
        <div className='lined'>
          <Sparkline data={result.sparkLine} />
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
            positionInfo{
              exposureCurrency
              positionExposure
              numPositions
            }
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