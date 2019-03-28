import React, { Component } from 'react';
import './repocard.css';
import { Pagination } from 'react-bootstrap';

function searchingFor(term)
{
    return function(x){
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class RepoCards extends Component {

    constructor(props){
        super(props);
        this.state={
           repocards:[],
           term: '',
        //    currentPageNumber: 1,
        //     totalItems: 1,
        //     itemsPerPage: 10
        }
        this.searchHandler = this.searchHandler.bind(this);
    }

     searchHandler(event){
         this.setState({term:event.target.value})
     }
    //  handleSelect(number) {
    //     console.log('handle select', number);
    //     this.setState({currentPageNumber: number});
    //   }
     

    componentDidMount(){
        this.getRepodetails()
        // this.setState({details:this.data.results.nr})
    }
    getRepodetails(){
          fetch('https://api.github.com/users/pytest-dev/repos')
          .then(res => res.json())
          .then(data => this.setState({
                             repocards:data,
                            //  currentPageNumber: data.currentPageNumber,
                            //  totalItems: data.totalItems,
                            //  itemsPerPage: data.itemsPerPage
                            }))
           
    }

  render() {
      console.log(this.state.repocards)
      const {term, repocards} = this.state; 
      let totalPages = Math.ceil(this.state.totalItems / this.state.numItemsPerPage);


    return (
      <div>
            
             <div className="input_box">
                <div>
                    <h3>Search Here <i class="far fa-hand-point-down"></i></h3>
                </div>
                 <form>
                     <input type="text" placeholder="Search by Name........" onChange={this.searchHandler}  value={term} />
                 </form>
             </div>

          <div className="col-md-12">
              <div className="row">
                 {repocards.filter(searchingFor(term)).map((repocard)=>
                  <div className="col-md-3">
                     <a href={repocard.owner.html_url} target="_blank" >
                     <div className="card" style={{'width': '100%'}} key={repocard.id}>
                    
                        <img className="card-img-top" src={repocard.owner.avatar_url} alt="Card"/>
                            <div className="card-body">
                                <h5 className="card-title">{repocard.name}</h5>
                                <p className="card-text">{repocard.description}</p>
                            </div>
                        <div class="card-footer" >
                           <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-7 col-sm-12 text-muted left-tag"  >
                                    {repocard.open_issues} Open Issues
                                    </div>
                                    
                                    <div class="col-md-5 col-sm-12 text-muted right-tag" >
                                    {repocard.forks} Forks
                                    </div>
                                </div>
                             </div>
                        </div>
                        
                     </div>
                     </a>
                  </div>
                  )}  
              </div>

              {/* <div>
              <Pagination
                    bsSize="medium"
                    items={totalPages}
                    activePage={this.state.currentPageNumber}
                    onSelect={this.handleSelect.bind(this)}/>
              </div> */}
         
          </div>

        
          
      </div>
    );
  }
}

export default RepoCards;
