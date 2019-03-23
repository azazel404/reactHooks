import React,{useState,useEffect,useReducer,useRef,useMemo} from "react"; //react hooks
import axios from "axios";
import List from "./List";
import TodoReducer from "./TodoReducers";
//kesimpulan, jika ingin eksekusi state kita menggunakan dectruction kedua jika dari contoh
//  const [todoState,setTodoState] , setTodoState untuk eksekusi , todoState untuk menampilkan hasil
//sama hal nya setTodoState sepertit this.setState


const Todo = props => {
    // const [todoName,setTodoName] = useState("");
    const todoInputRef = useRef();
    const[validTodoname,setErrorTodoname] = useState("false")
    // const [todoList,setTodoList] = useState([]);
    // const [submitTodo,setSubmitTodo] = useState(null)
    const [todoList,dispatch] = useReducer(TodoReducer,[])

    // const [todoState,setTodoState] = useState({
    //     userInput : '',
    //     todoList : []
    // })
 
    useEffect(() => {
        axios.get("https://databasesaja.firebaseio.com/todos.json")
        .then(result => {
            console.log(result)
            const todoData = result.data
            const todos = []
            for(const key in todoData){
                // console.log(key)
                todos.push({id:key,name:todoData[key].name})
            }
            dispatch({type:'SET',payload: todos})
        })
    },[])


    //effect jalannya mouse
    // const mouseMoveHandler = event => {
    //     console.log(event.clientX,event.clientY)
    // }

    // useEffect(() => {
    //     document.addEventListener('mouseover',mouseMoveHandler)
    //     return () => {
    //         document.removeEventListener('mousemove',mouseMoveHandler)
    //     }
    // },[])

    //input change name
    // const inputChangeHandler = event => {
    //     // console.log(setTodoName(event.target.value));
    //     setTodoName(event.target.value)
    //     // setTodoState({
    //     //     userInput : event.target.value,
    //     //     todoList : todoState.todoList
    //     // })
    // }

    //validation input
    const validate = (event) => {
      if(event.target.value.trim() === ''){
        setErrorTodoname(false)
      }else{
        setErrorTodoname(true)
      }
    }


    //meanambahkan data ke array , 
    const todoAddHandle = () => {
        // console.log(todoList);
        //cara lain set ke dalam arraya todoList.concat(todoName)
        const todoName = todoInputRef.current.value;
        axios
          .post("https://databasesaja.firebaseio.com/todos.json", {
            name: todoName
          })
          .then(res => {
              console.log(res.data)
            setTimeout(() => {
                const todoItem = {id:res.data.name,name:todoName}
                 dispatch({
                   type: "ADD",
                   payload: todoItem
                 });
            },3000)
          })
          .catch(err => {
            console.log(err);
          });


        // fetch("https://databasesaja.firebaseio.com/todos.json", {
        //   method: "POST",
        //   body: JSON.stringify({ name: todoName }),
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // }).then(res => {
        //     const todoItem = {id :res.data.name,name: todoName}
        //     console.log(todoItem);
        //     setTodoList([...todoList, todoItem]);
        // })
        // .catch(err => {
        //     console.log(err)
        // })

        // setTodoState({
        //     userInput : todoState.userInput,
        //     todoList : [...todoState.todoList,todoState.userInput]
        // })  
    }

 
    const todoHandleDelete = todoId => {
      axios
        .delete(
          `https://databasesaja.firebaseio.com/todos/${todoId}.json`
        )
        .then(res => {
          dispatch({
            type: "REMOVE",
            payload: todoId
          });
        })
        .catch(err => console.log(err));
    }

    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="Todo"
          ref={todoInputRef}
          onChange={validate}
          style={{ backgroundColor: validTodoname ? "trasparent" : "grey" }}
        />
        <button type="button" onClick={todoAddHandle}>
          Add
        </button>
        {/* //optimize fungsi render cukup sekali , dan tidak berkali kali */}
        {useMemo(() => (
          <List item={todoList} ClickDeleteGan={todoHandleDelete} />
        ),[todoList]
        )}
      </React.Fragment>
    );
}

export default Todo;