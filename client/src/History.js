import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { Button } from 'reactstrap';
import './history.css';
class History extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            history : [],
          };
          this.getHistory()
    };
    
    //all the search history
    getHistory(){ 
        axios.get('/getHistory').then(res=>{
            this.setState({history: res.data})
        })
    }

    //deleteButton function
    async deleteRecord(id){
        console.log(id)
        axios.get('/deleteHistory?id='+id
        ).then(res=>{
            console.log(res.data)
            this.getHistory();
        })
    }
    //table
    render(){
        return(
            <div className="container2">
            <div className="colhistory">
            <a href="http://localhost:3000/" class="back">Back</a>
                <h1>Search History</h1>
             <ReactTable  
              style={{ "font-size":"15px" }}
              data={this.state.history}
              NoDataComponent={() => "No Search History Found."}
              Props={{noDataText:''}}
              columns={[
                {
                  Header: 'Delete',
                  accessor: 'title',
                  Cell:  row  => (
                    <Button onClick={() => {
                        this.deleteRecord(row.original._id);
                      }}> delete</Button>
                  )
                },
                {
                  Header: 'Search History',
                  accessor: 'search',
                  style: {'whiteSpace':'unset'}
                },
                {
                    Header: 'Search Date',
                    accessor: 'updated',
                    style: {'whiteSpace':'unset'}
                  }
            
              ]}
              defaultPageSize={10}
              className="-history"
              
              
            />
          </div>
        </div>  

        );
    }
}

export default History;