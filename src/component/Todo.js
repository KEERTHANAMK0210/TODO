import { useState } from "react";
import "./Todo.css";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const[editId,setEditId]=useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  

  const addTodo = () => {
    if (input !== "") {
      setData([...data, { list: input, id: Date.now(), status: false }]);
      console.log(data);
      setInput("");
    }
    if (editId) {
      const editTodo = data.find((data) => data.id === editId);
      const updateTodo = data.map((to) =>
        to.id === editTodo.id ? { id: to.id, list: input } : { id: to.id, list: to.list }
      );
      setData(updateTodo);
      setEditId(0);
      setInput("");
    }
  };
  

  const onDelete =(id)=>{
    setData(data.filter((to) => to.id !== id))
  }

  const onComplete=(id)=>{
    let complete=data.map((list)=>{
      if(list.id === id){
      return({...list , status : !list.status})
      }
      return list
    })
    setData(complete)
  }

  

  const onEdit = (id) => {
    const editData = data.find((to) => to.id === id);
    if (editData) {
      setInput(editData.list);
      setEditId(editData.id);
    }
  };
  
    return (
    
    <div className="container">
      
      <h1>TODO APP</h1>

      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => setInput(event.target.value)}
        />

        <button onClick={addTodo}> {editId ? 'EDIT' : 'ADD'} </button>
      </form>

      <div className="list">
        <ul>
          {data.map((datas) => (
            <li className="list-items">
              <div className="list-item-list" id={datas.status ? 'list-item' : ''}> {datas.list} </div>

              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={()=>onComplete(datas.id)}
                />
                <FiEdit className="list-item-icons"
                 id="edit" 
                 title="Edit"
                 onClick={()=>onEdit(datas.id)}
                 
                 />


                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(datas.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
