import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.props.category}-NewsApp`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d934ac28d2c047b08579093479a0982f&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
        this.props.setProgress(30);

    let parsedata = await data.json();
        this.props.setProgress(50);

    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
      
    });
        this.props.setProgress(100);

  }

  // handleprevclick = async () => {
  //   console.log("prev");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=d934ac28d2c047b08579093479a0982f&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedata = await data.json();
  //   console.log(parsedata);

  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedata.articles,
  //     loading: false,
  //   });
  // };

  // handlenextclick = async () => {
  //   console.log(
  //     "Page:",
  //     this.state.page,
  //     "totalResults:",
  //     this.state.totalResults
  //   );

  //   // ✅ Exit early if next page is beyond total pages
  //   if (
  //     this.state.page + 1 >
  //     Math.ceil(this.state.totalResults / this.props.pageSize)
  //   ) {
  //     return;
  //   }

  //   this.setState({ loading: true });

  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=d934ac28d2c047b08579093479a0982f&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`;

  //   let data = await fetch(url);
  //   let parsedata = await data.json();

  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedata.articles,
  //     loading: false,
  //   });
  // };

   fetchMoreData = async () => {
  
  const nextPage = this.state.page + 1;

  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d934ac28d2c047b08579093479a0982f&page=${nextPage}&pageSize=${this.props.pageSize}`;
  
  this.setState({ loading: true }); // optional

  let data = await fetch(url);
  let parsedata = await data.json();

  this.setState({
    page: nextPage,
    articles: this.state.articles.concat(parsedata.articles),
    totalResults: parsedata.totalResults,
    loading: false,
  });
};


  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "35px 0px" }}>
          News App- Top {this.props.category} Headlines
        </h2>
        {/*  {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((ele) => {
              return (
                <div className="col-md-4" key={ele.url}>
                  <NewsItem
                    title={ele.title ? ele.title.slice(0, 45) : ""}
                    description={
                      ele.description ? ele.description.slice(0, 88) : ""
                    }
                    imgurl={
                      ele.urlToImage
                        ? ele.urlToImage
                        : "https://static.politico.com/b5/0f/af082a24493eb10f82de6448de21/democrats-ken-martin-08682.jpg"
                    }
                    newsurl={ele.url}
                    author={ele.author}
                    date={ele.publishedAt}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          {/* <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            {" "}
            &larr; prev
          </button> */}
          {/* <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handlenextclick}
          >
            Next &rarr;{" "}
          </button> */}
        </div>
      </div>
    );
  }
}

export default News;
