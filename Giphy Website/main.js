$class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: []
      
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ term: event.target.value });
  }
  
  componentDidMount(){
     const api_key = 'dc6zaTOxFJmzC';
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=10`;
   fetch(url)
      .then(response => response.json())
      .then(json=> {
     console.log(json);
            this.setState({ 
     items:json.data
   });
   });
  }
  
  handleSubmit (event) {
    event.preventDefault();
    const api_key = 'dc6zaTOxFJmzC';
    const url = `https://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}&limit=10`;
    https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=10
   fetch(url)
      .then(response => response.json())
      .then(json=> {
     console.log(json);
            this.setState({ 
     term:'', 
     items:json.data
   });
   }); 
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.term} onChange={this.onChange} />
          <button>Search!</button> 
        </form>
           {this.state.items.map(item => <img src = {item.images.downsized.url}  alt={this.state.term}/>)}

      </div>
    );
  }
}

ReactDOM.render(
        <div>
           <App/>
            </div>,
            document.getElementById('root')
        );
/*/*function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  const ul = document.getElementById('authors');
  const url = 'https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=10';
  fetch(url)
  .then((resp) => resp.json())
  .then(function(res) {
    let authors = res.data;
    console.log(authors);
    return authors.map(function(author) {
      let li = createNode('li'),
          img = createNode('img');
      img.src = author.images.fixed_height.url;
     
      append(li, img);
      append(ul, li);
    })
  })
  .catch(function(error) {
    console.log(error);
  });   
*/*/