// Gregory FJ Hogue
// 2016-01-24

// Defines Search Bar and Results Grid
var SearchComponent = React.createClass({
  displayName: "SearchComponent",

  // Returns initial this.state object
  // Void -> {}
  getInitialState: function () {
    return {
      // Search Bar Text
      value: "",

      // Ordered list of icon URLs
      iconURL: ["", "", "", "", "", "", "", "", "", ""],

      // Ordered list of photo link URLs
      photoURL: ["", "", "", "", "", "", "", "", "", ""],

      // Sorting rule from Dropdown Selector
      sort: "relevance"
    };
  },

  // Sets both URL states based on JSON data
  // JSON -> Void
  jsonParse: function (data) {
    if (data.stat == "ok") {
      var iconURLs = ["", "", "", "", "", "", "", "", "", ""];
      var photoURLs = ["", "", "", "", "", "", "", "", "", ""];

      // Iterate by each photo
      $(data.photos.photo).each(function (index, value) {
        iconURLs[index] = value.url_q;
        photoURLs[index] = "https://www.flickr.com/photos/" + value.owner + "/" + value.id;
      });

      this.setState({
        iconURL: iconURLs,
        photoURL: photoURLs
      });
    }
  },

  // Sends GET request to Flickr REST API
  // Void -> Void
  search: function () {
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
  handleInputChange: function (event) {
    this.setState({
      value: event.target.value
    });
  },

  // Calls search if the 'Return' key is pressed and search box is not empty
  // Event -> Void
  handleKeyPress: function (event) {
    if (event.keyCode == "13" && this.state.value != "") {
      this.search();
    }
  },

  // Update this.state.sort when dropdown selector is modified
  // Event -> Void
  handleSelectChange: function (event) {
    this.setState({
      sort: event.target.value
    });
  },

  // Search when button is pressed
  // Event -> Void
  handleButtonClick: function (event) {
    if (this.state.value != "") {
      this.search();
    }
  },

  // Returns the JSX to be rendered as HTML for the web page
  // Void -> JSX
  render: function () {
    return React.createElement(
      "div",
      { className: "container-main" },
      React.createElement(
        "div",
        { className: "container-1" },
        React.createElement("input", { type: "search", id: "search", placeholder: "Search...", value: this.state.value,
          onChange: this.handleInputChange, onKeyDown: this.handleKeyPress }),
        React.createElement(
          "select",
          { value: this.state.sort, onChange: this.handleSelectChange },
          React.createElement(
            "option",
            { value: "relevance" },
            "Relevant"
          ),
          React.createElement(
            "option",
            { value: "interestingness-desc" },
            "Interesting (decending)"
          ),
          React.createElement(
            "option",
            { value: "interestingness-asc" },
            "Interesting (ascending)"
          ),
          React.createElement(
            "option",
            { value: "date-posted-desc" },
            "Date uploaded (decending)"
          ),
          React.createElement(
            "option",
            { value: "date-posted-asc" },
            "Date uploaded (ascending)"
          ),
          React.createElement(
            "option",
            { value: "date-taken-desc" },
            "Date taken (decending)"
          ),
          React.createElement(
            "option",
            { value: "date-taken-asc" },
            "Date taken (ascending)"
          )
        ),
        " ",
        React.createElement("br", null),
        React.createElement(
          "button",
          { onClick: this.handleButtonClick },
          "Search"
        )
      ),
      React.createElement(
        "div",
        { className: "container-2" },
        React.createElement(
          "table",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: this.state.photoURL[0], target: "_blank" },
                React.createElement("img", { src: this.state.iconURL[0], alt: "" })
              )
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: this.state.photoURL[1], target: "_blank" },
                React.createElement("img", { src: this.state.iconURL[1], alt: "" })
              )
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: this.state.photoURL[2], target: "_blank" },
                React.createElement("img", { src: this.state.iconURL[2], alt: "" })
              )
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: this.state.photoURL[3], target: "_blank" },
                React.createElement("img", { src: this.state.iconURL[3], alt: "" })
              )
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: this.state.photoURL[4], target: "_blank" },
                React.createElement("img", { src: this.state.iconURL[4], alt: "" })
              )
            )
          ),
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: this.state.photoURL[5], target: "_blank" },
                React.createElement("img", { src: this.state.iconURL[5], alt: "" })
              )
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: this.state.photoURL[6], target: "_blank" },
                React.createElement("img", { src: this.state.iconURL[6], alt: "" })
              )
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: this.state.photoURL[7], target: "_blank" },
                React.createElement("img", { src: this.state.iconURL[7], alt: "" })
              )
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: this.state.photoURL[8], target: "_blank" },
                React.createElement("img", { src: this.state.iconURL[8], alt: "" })
              )
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: this.state.photoURL[9], target: "_blank" },
                React.createElement("img", { src: this.state.iconURL[9], alt: "" })
              )
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(SearchComponent, null), document.getElementById("flickrSearch"));
