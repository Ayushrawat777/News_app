import React from "react";

const NewsItem = (element) => {
  const { title, description, urlToImage, url, author, publishedAt, source } =
    element;
  return (
    <div className="card">
      <div>
        <span className="badge"> {source.name} </span>
      </div>
      <img
        src={
          !urlToImage
            ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
            : urlToImage
        }
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title} </h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-muted">
            By {!author ? "Unknown" : author} on{" "}
            {new Date(publishedAt).toGMTString()}
          </small>
        </p>
           <a rel="noreferrer" href={url} target="_blank" className="btn">
            Read More
          </a> 
      </div>
    </div>
  );
};

export default NewsItem;
