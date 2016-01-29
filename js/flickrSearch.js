// Gregory FJ Hogue
// 2016-01-24

// Defines Search Bar and Results Grid
var SearchComponent = React.createClass({

  // Returns initial this.state object
  // Void -> {}
  getInitialState: function() {
    return {
      // Search Bar Text
      value: "",

      // Ordered list of icon URLs
      iconURL: ["","","","","","","","","",""],

      // Ordered list of photo link URLs
      photoURL: ["","","","","","","","","",""],

      // Sorting rule from Dropdown Selector
      sort: "relevance"
    };
  },


  // Sets both URL states based on JSON data
  // JSON -> Void
  jsonParse: function(data) {
    if(data.stat == "ok") {
      var iconURLs = ["","","","","","","","","",""];
      var photoURLs = ["","","","","","","","","",""];

      // Iterate by each photo
      $(data.photos.photo).each(function(index, value) {
        iconURLs[index] = value.url_q;
        photoURLs[index] = "https://www.flickr.com/photos/"+value.owner+"/"+value.id
      });

      this.setState({
        iconURL: iconURLs,
        photoURL: photoURLs
      });
    }
  },


  // Sends GET request to Flickr REST API
  // Void -> Void
  search: function() {
    var api_key = "YOUR_KEY_HERE";
    var request = "https://api.flickr.com/services/rest/?&api_key=" + api_key;
    var method = "&method=flickr.photos.search&text=" + this.state.value + "&per_page=10&page=1&extras=url_q,url_k,url_b,url_z,url_h,url_c";
    var sort = "&sort=" + this.state.sort;
    var format = "&format=json&jsoncallback=?";
    var url = request + method + sort + format;

    $.getJSON(url, this.jsonParse);
  },


  // Update this.state.value when search input is modified
  // Event -> Void
  handleInputChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },


  // Calls search if the 'Return' key is pressed and search box is not empty
  // Event -> Void
  handleKeyPress: function(event) {
    if((event.keyCode == "13") && (this.state.value != "")) {
      this.search();
    }
  },


  // Update this.state.sort when dropdown selector is modified
  // Event -> Void
  handleSelectChange: function(event) {
    this.setState({
      sort: event.target.value
    });
  },


  // Search when button is pressed
  // Event -> Void
  handleButtonClick: function(event) {
    if(this.state.value != "") {
      this.search();
    }
  },


  // Returns the JSX to be rendered as HTML for the web page
  // Void -> JSX
  render : function() {
    return (
      <div className="container-main">
        <div className="container-1">
          <input type="search" id="search" placeholder="Search..." value={this.state.value}
            onChange={this.handleInputChange} onKeyDown={this.handleKeyPress} />
          <select value={this.state.sort} onChange={this.handleSelectChange}>
            <option value="relevance">Relevant</option>
            <option value="interestingness-desc">Interesting (decending)</option>
            <option value="interestingness-asc">Interesting (ascending)</option>
            <option value="date-posted-desc">Date uploaded (decending)</option>
            <option value="date-posted-asc">Date uploaded (ascending)</option>
            <option value="date-taken-desc">Date taken (decending)</option>
            <option value="date-taken-asc">Date taken (ascending)</option>
          </select> <br />
          <button onClick={this.handleButtonClick}>Search</button>
        </div>
        <div className="container-2">
          <table>
            <tr>
              <td><a href={this.state.photoURL[0]} target="_blank"><img src={this.state.iconURL[0]} alt="" /></a></td>
              <td><a href={this.state.photoURL[1]} target="_blank"><img src={this.state.iconURL[1]} alt="" /></a></td>
              <td><a href={this.state.photoURL[2]} target="_blank"><img src={this.state.iconURL[2]} alt="" /></a></td>
              <td><a href={this.state.photoURL[3]} target="_blank"><img src={this.state.iconURL[3]} alt="" /></a></td>
              <td><a href={this.state.photoURL[4]} target="_blank"><img src={this.state.iconURL[4]} alt="" /></a></td>
            </tr>
            <tr>
              <td><a href={this.state.photoURL[5]} target="_blank"><img src={this.state.iconURL[5]} alt="" /></a></td>
              <td><a href={this.state.photoURL[6]} target="_blank"><img src={this.state.iconURL[6]} alt="" /></a></td>
              <td><a href={this.state.photoURL[7]} target="_blank"><img src={this.state.iconURL[7]} alt="" /></a></td>
              <td><a href={this.state.photoURL[8]} target="_blank"><img src={this.state.iconURL[8]} alt="" /></a></td>
              <td><a href={this.state.photoURL[9]} target="_blank"><img src={this.state.iconURL[9]} alt="" /></a></td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <SearchComponent />,
  document.getElementById("flickrSearch")
);
