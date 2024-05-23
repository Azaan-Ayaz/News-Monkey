import React, { Component } from 'react';
import NewsItem from './NewsItem';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default class News extends Component {
    constructor() {
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: true,
            page: 1, // Added page state to keep track of current page

        }
    }

    async componentDidMount() {
        this.props.setProgress(0)
        console.log("object");
        let apiKey = "4f56f880dc6d4c1f97701ba21efba8af";
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}&pageSize=${this.props.pageSize}`;

        try {
            this.setState({loading: true})
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let parsedData = await response.json();
            console.log(parsedData);
            this.setState({ articles: parsedData.articles, loading: false, totalResults: parsedData.totalResults });
        } catch (error) {
            console.error('Error:', error);
            this.setState({ loading: false });
        }
        this.props.setProgress(100)
    }

    handleNextClick = async () => {
        console.log("next");
        const nextPage = this.state.page + 1;
        const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize); // Calculate total pages
    
        if (nextPage <= totalPages) { // Change the condition here
            try {
                let apiKey = "4f56f880dc6d4c1f97701ba21efba8af";
                let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&page=${nextPage}&apiKey=${apiKey}&pageSize=${this.props.pageSize}`;
                this.setState({ loading: true }); // Set loading to true before fetching data
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let parsedData = await response.json();
                console.log(parsedData);
                this.setState({ articles: parsedData.articles, page: nextPage, loading: false }); // Set loading to false after fetching data
            } catch (error) {
                console.error('Error:', error);
                this.setState({ loading: false }); // Set loading to false if there's an error
            }
        }
    }
    
    

    handlePreviousClick = async () => {
        console.log("previous");
        if (this.state.page > 1) {
            const prevPage = this.state.page - 1;
            try {
                let apiKey = "4f56f880dc6d4c1f97701ba21efba8af";
                let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&page=${prevPage}&apiKey=${apiKey}&pageSize=${this.props.pageSize}`;
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let parsedData = await response.json();
                console.log(parsedData);
                this.setState({ articles: parsedData.articles, page: prevPage });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    render() {
        console.log("render");
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-center">NewsMonkey - Top Headlines</h1>
                {this.state.loading && 
                    <div className="text-center text-2xl">Loading...</div>
    }
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {this.state.articles.map((item, index) => (
                                <NewsItem
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    imageUrl={item.urlToImage}
                                    tab={item.url}
                                    published={item.publishedAt}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center mt-8 space-x-4">
                            <button
                                disabled={this.state.page <= 1}
                                className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
                                onClick={this.handlePreviousClick}
                            >
                                <GrFormPrevious size={24} />
                            </button>
                            <button
                                className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
                                onClick={this.handleNextClick}
                                disabled={this.state.page >= Math.ceil(this.state.totalResults / 6)}
                            >
                                <GrFormNext size={24} />
                            </button>
                        </div>
                    </div>
                
            </div>
        );
    }
}
