import './App.css';
import React from 'react';

function App() {
  //for storing values and displaying it on screen
  //State-values varialble store panna use pandrathu
  const [title,setTitle]=React.useState("");
  const [Message,setMessage]=React.useState("");
  const [todolist,setTodoList]=React.useState([]);
  const [todoAPI,setTodo]=React.useState([]);

  React.useEffect(()=>{
    getTodo();
  },[])

  function getTodo(){
    fetch("http://localhost/fullstack/get_todo.php").
    then((response)=>response.json())
    .then((data)=>{
      let todo=[];
      todo.forEach((data)=>{
        todo.push(data);
      });
      setTodo(todo);
      console.log(todo)
    })
  }
  //creating child function of app()
  function onAddClick(){
    let arrayList=todolist;
    arrayList.push({"title":title,"Message":Message});
    setTodoList([...arrayList]);
    console.log(todolist);//checking purpose
    //alert('title: ${title}, Message: ${Message}');
    const formData=new FormData();
    formData.append("title",title);
    formData.append("Message",Message);
    fetch("http://localhost/fullstack/add_todo.php",{
      method:"POST",
      body:formData
    }).then((result)=>result.text())
    .then((data)=>{
      if(data=="Data inserted"){
          alert("Data inserted");
      }else{
        alert("Error Inserting");
      }
    })
  }
  return (
    <div className="App">
      <h3>My Tasks</h3>
      <button onClick={onAddClick}>Add</button>
      <div>
        <form>
          <input aria-label='Title' placeholder='Title' onChange={(value)=>setTitle(value.currentTarget.value)}/>
          <input aria-label='Message' placeholder='Message' onChange={(value)=>setMessage(value.currentTarget.value)}/>
        </form>
      </div>
      <div>
        {//displaying the array values
        todoAPI.lenght > 0 &&
          todoAPI.map((item)=> {return(<div key={item.title}><p>Title:{item.title}</p><p>Message:{item.Message}</p></div>)})
        }
      </div>
    </div>
  );
}

export default App;
