import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class Categories extends Component{
  render(){
     
   return (
   <div class="categ">
 
    {this.props.categories.map(category=>(
     <p> {category.id} - {category.name} - {category.description}
       </p>))}
       </div>
       )
   }
}

class Documents extends Component{
  render(){
     
 return (
   <div class="categ">
 
     {this.props.documents.map(doc=>(
     <p> {doc.id} - {doc.content} -{doc.type} - {doc.link} - {doc.category} </p>))}
       </div>
  )
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {id:0,
     content:'',
     type:'',
     link:'',
     category_id:0
    };

    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeId(event) {
    this.setState({id: event.target.value});
  }
 handleChangeContent(event) {
    this.setState({content: event.target.value});
  }
   handleChangeType(event) {
    this.setState({type: event.target.value});
  }
  handleChangeLink(event) {
    this.setState({link: event.target.value});
  }
   handleChangeCategory(event) {
    this.setState({category_id: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.id + this.state.content + this.state.type +this.state.link+ this.state.category_id);
    let api="https://proiect-tehnologiiweb-danuta.c9users.io/documents"
 
   axios.post(api, {id: this.state.id, content: this.state.content, type:this.state.type, link:this.state.link, category_id:this.state.category_id}).catch(error=>{
       console.log(error)
   }) 
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          *Id:
          <input type="number" nume={this.state.value} onChange={this.handleChangeId} />
        </label>
        <br/>
        <label>
          *Content:
          <input type="text" nume={this.state.value} onChange={this.handleChangeContent} />
        </label>
        <br/>
         <label>
          *Type:
          <input type="text" nume={this.state.value} onChange={this.handleChangeType} />
        </label>
        <br/>
          <label>
          *Link:
          <input type="link" nume={this.state.value} onChange={this.handleChangeLink} />
        </label>
        <br/>
          <label>
          *Category_id:
          <input type="number" nume={this.state.value} onChange={this.handleChangeCategory} />
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class FormC extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {id:0,
     name:'',
     description:'',
    };

    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeId(event) {
    this.setState({id: event.target.value});
  }
 handleChangeName(event) {
    this.setState({name: event.target.value});
  }
   handleChangeDescription(event) {
    this.setState({description: event.target.value});
  
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.id + this.state.name + this.state.description);
    let api="https://proiect-tehnologiiweb-danuta.c9users.io/categories"
 
   axios.post(api, {id: this.state.id,name: this.state.name, description:this.state.description}).catch(error=>{
       console.log(error)
   }) 
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          *Id:
          <input type="number" nume={this.state.value} onChange={this.handleChangeId} />
        </label>
        <br/>
        <label>
          *Name:
          <input type="text" nume={this.state.value} onChange={this.handleChangeName} />
        </label>
        <br/>
         <label>
          *Description:
          <input type="text" nume={this.state.value} onChange={this.handleChangeDescription} />
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}



//aplicatia buna
class App extends Component {
  constructor(props){
     super(props)
     this.state={
       Categories:[],
       Documents:[],
      }
    }
   PrintCategory=() =>{

   let api="https://proiect-tehnologiiweb-danuta.c9users.io/categories"
   
   axios.get(api).then((results) => {
     this.setState({Categories:results.data})
   });
  }
  
    PrintDocument=() =>{
   let api="https://proiect-tehnologiiweb-danuta.c9users.io/documents"
   
   axios.get(api).then((results) => {
     this.setState({Documents:results.data})
   });
  }
  
  
  render() {
       return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Welcome to D & V Company </h1>
        </header>
        <p className="App-intro">
  
        </p>
 
      
      <p>Introduceti un noua categorie de documente: </p>
      <FormC form={this.state.Form}/>
      <p>Introduceti un nou document al firmei: </p>
      <Form form={this.state.Form}/>
      <p> ****Aveti optinea de a afisa documentele si categoriile companiei:</p>
      <Categories categories={this.state.Categories} />
      <Documents documents={this.state.Documents}/>
      <button  onClick={()=> this.PrintCategory}> Afisare categorii </button>
      <br/>
      <button onClick={()=> this.PrintDocument}> Afisare documente </button>
      
       
      </div>

    ); 
  }
}

export default App;
