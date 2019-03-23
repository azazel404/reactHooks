import React, { useState } from 'react';
import Todo from "./components/Todo";
import Header from "./components/Header";
import Auth from "./components/Auth";
import AuthContext from "./auth-context";


const App = props => {
  const [page,setPage] = useState('auth');
  const [authStatus,setAuthStatus] = useState(false) //state validation login

  //fungsi untuk switch halaman
  const switchPage = (pageName) =>  {
    setPage(pageName)
  }

  //jika sukses login false jdi true
  const login = () => {
    setAuthStatus(true)
  }

   return (
     <div>
       {/* penggunaan createContext / useContext */}
       <AuthContext.Provider value={{status:authStatus,login:login}}>
         <Header
           onLoadTodos={switchPage.bind(this, "todos")}
           onLoadAuth={switchPage.bind(this, "auth")}
         />
         <hr />
         {page === "auth" ? <Auth /> : <Todo />}
       </AuthContext.Provider>
     </div>
   );
}

export default App;
