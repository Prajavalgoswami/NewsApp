import React, { Component } from "react";

export class NewsItem extends Component {
    
  render() {
   let {title, description,imgurl,newsurl,author,date} = this.props;
    return (
      <div className="my-3">
        <div className="card"   >
          <img src={imgurl} className="card-img-top" alt="alt" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="caed-text"><small className="text-muted">By {author ? author: "Unknown"} on {new Date(date).toGMTString() }</small></p>
            <a href={newsurl} rel="noreferrer" target="_blank"  className="btn btn-sm btn-dark" >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
