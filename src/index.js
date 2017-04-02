import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';
const API_KEY = 'AIzaSyDMKkTBx9EnfmC4l3zigzwnzlddHkBx2qs';

//Main component for generating html

//const App = () => {
class App extends Component{

    constructor(props){
        super(props);

        this.state = {
            videos:[],
            selectedVideo: null
        };

        this.videoSearch('football');
    }

    videoSearch(term){
        //Youtube search
        YTSearch({key: API_KEY, term:term},(videos)=>{
            this.setState({
                videos:videos,
                selectedVideo : videos[0]
            })
        });
    }

    render(){

        const videoSearch = _.debounce( term => {this.videoSearch(term)},300);

        return (
            <div>
                <SearchBar onSearchTermChange={ videoSearch }/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect = { selectedVideo =>this.setState({selectedVideo}) }
                    videos={this.state.videos}/>
            </div>
        );
    }
}

//Put in DOM
ReactDOM.render(<App />, document.querySelector('.container'));
//React.render(App);