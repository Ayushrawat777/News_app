import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import reducer from "./reducer";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const initials = {
  isLoading: false,
  isError: false,
  articles: [],
  totalResults:0
  /* page:1 */
};
const pageSize = 9;
const apiKey = process.env.REACT_APP_NEWS_API;

const News = (props) => {
  const { category, setProgress } = props;
  const [state, dispatch] = useReducer(reducer, initials);
  const [page, setPage] = useState(1);
  const API = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  const fetchData = async (url) => {
    dispatch({ type: "LOADING" });
    try {
      setProgress(10);
      const res = await fetch(url);
      setProgress(30);
      const data = await res.json();
      setProgress(70);
      console.log(data.totalResults );
      dispatch({ type: "NEWSDATA", payload: data.articles });
      dispatch({ type: "NEWSRESULT", payload: data.totalResults });
      setProgress(100);
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    fetchData(API);
  }, [category]);

  const fetchNextData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${
      page + 1
    }&pageSize=${pageSize}`;
    dispatch({ type: "LOADING" });
    try {
      setProgress(10);
      const res = await fetch(url);
      setProgress(30);
      const data = await res.json();
      setProgress(70);
      dispatch({ type: "NEWSDATA", payload: data.articles });
      setProgress(100);
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  const fetchPrevData = async () => {
    setPage(page - 1);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${
      page - 1
    }&pageSize=${pageSize}`;
    dispatch({ type: "LOADING" });
    try {
      setProgress(10);
      const res = await fetch(url);
      setProgress(30);
      const data = await res.json();
      setProgress(70);
      dispatch({ type: "NEWSDATA", payload: data.articles });
      setProgress(100);
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  if (state.isLoading) {
    return (
      <>
        <h1 className="heading">
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <h1 className="heading">
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      <div className="container">
        <div className="row">
          {state.articles.map((element) => {
            return (
              <div className="card-container" key={element.url}>
                <NewsItem {...element} />
              </div>
            );
          })}
        </div>
        <div className="btn-section">
          <button
            className="btn btn-btn"
            onClick={() => {
              fetchNextData();
            }}
             style={page> state.totalResults/pageSize ?{ background:"#aba4a4"}:{background:""}}
            disabled={page > state.totalResults/pageSize ? true : false}  
          >
            Next
          </button>
          <button
            className="btn btn-btn"
            onClick={() => {
              fetchPrevData();
            }}
            style={page <=1 ?{ background:"#aba4a4"}:{background:""}}
           disabled={page <= 1 ? true : false} 
          >
            Previous
          </button>
        </div>
      </div>
    </>
  );
};

export default News;
