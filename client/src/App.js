import React from 'react';
import './App.css';
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';;

//front end data
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data:[ {
        "author": "Edward Russell",
        "title": "American Airlines reinforces Hilton Head dominance with new routes",
        "description": "American Airlines is reinforcing its position at the top of the pack in Hilton Head, South Carolina, with new flights to Chicago, Dallas/Fort Worth and Philadelphia next spring. The Oneworld Alliance carrier will launch the new seasonal service between its th…",
        "url": "http://thepointsguy.com/news/american-airlines-reinforces-hilton-head-dominance-with-new-routes/",
        "urlToImage": "https://i0.wp.com/thepointsguy.com/wp-content/uploads/2019/10/GettyImages-860629124.jpg?fit=3722%2C2400px&ssl=1",
        "publishedAt": "2019-10-21T21:30:29Z",
        "content": "American Airlines is reinforcing its position at the top of the pack in Hilton Head, South Carolina, with new flights to Chicago, Dallas/Fort Worth and Philadelphia next spring.\r\nThe Oneworld Alliance carrier will launch the new seasonal service between its t… [+1538 chars]"
    }],
      loading: false,
      modal: false
    };
    this.search = this.search.bind(this);
    this.onClick2 = this.onClick2.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  //called route 
  getAllNews(){
     axios.get('/getNews?country=my')
      .then(result => {
        console.log(this.state.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.search();
  }

  //search front end
  search(a =null){
    var query = `/searchNews?q=${this.state.search}`;

    if(this.state.loading === true && this.state.search.trim() != ''){
      axios.get(query).then(response=>{

        for(let i = 0; i < response.data.length; i++){
          delete response.data[i]['source']
        }
        this.setState({data:response.data})
      })
        .catch(error => {
          console.log('Error: '+ error);
        });
    }
    
  }
  async onClick2() {
      this.state.loading = true;
      await this.search('1');

  }
 
  deleteRecord = value => {
    console.log('to delete: ', value);
    const query = `/deletemovie?title=${value}`;
    axios
      .get(query)
      .then(result => {
        this.getAllNews();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };
  handleChange = (e) =>{ 
    this.setState({search: e.target.value});
  }
  
  toggle(){
    this.setState({modal: !this.state.modal})
    console.log(this.state.modal)
  }
 
  render() {

    return (
      <div className="App">
        <div className="jumbotron text-center header">
          <h1>Global News</h1>
          <p>Search for News</p>
        </div>
        <div className="container search">
          <div className="col-sm-12">
            <p /> 
            <form >
              <label style={{"color":"white"}}>Enter news by title or description:</label>
              <input style={{"font-size":"15px"}}
                type="text"
                className="form-control"
                value={this.state.search}
                onChange={this.handleChange}              
                />
              <p />
              <Button color="primary" onClick={this.onClick2} >search</Button>{' '}
              <Link to="/history"><Button color="primary" onClick={this.toggle}>History</Button></Link>      
            </form> 
            <p />
          

          </div>
          <div>

          </div>
        </div>
    

        <div className="container">
          <div className="col-sm-12">
            <p />
            {/* {this.state.data.map(a =>{
                return 
            })} */}
            <ReactTable style={{"font-size":"13px"}}
              data={this.state.data}
              columns={[
            
                {
                  Header: 'Title',
                  accessor: 'title',
                  style: {'whiteSpace':'unset'}
                },
                {
                  Header: 'Description',
                  accessor: 'description',
                  style: { 'whiteSpace': 'unset' }
                },
                {
                  Header: 'Image',
                  Cell: row => {
                    return (
                      <div>
                        <a href={row.original.url} target="_blank"> 
                        <img height={250} src={row.original.urlToImage} />
                        </a>
                      </div>
                    );
                  }              
                  },
                {
                  Header: 'Content',
                  accessor: 'content',
                  style: { 'whiteSpace': 'unset' }
                },
                {
                  Header: 'Published date',
                  Cell: row => {
                    return (
                      <div>
                        {/* <img height={250} src={row.original.poster} /> */}
                          <p style={{"color":"white"}}>{row.original.publishedAt}</p>
                      </div>
                    );
                  }
                },
              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </div>
        </div>
       
      </div>
    );
  }
}


export default App;
