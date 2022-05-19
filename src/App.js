import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  
  const [users, setUsers] = useState([])
  
  //INICIA SEMPRE QUE CARREGA A PAGINA
  useEffect(() => {
    sendEmailOnline()
  }, [])

  const fetchUserIds = async () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  const checkStatus = async (userId) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  const sendEmail = async (userId) => {
    // return if it was sucessfull or not
    return Math.random() > 0.1 ? true : false;
  };

  //ENVIA EMAIL PARA O USUARIO QUE ESTÁ ONLINE
  const sendEmailOnline = async () => {  
    const usersSendEmailSuccessfully = []
    //PEGA TODOS OS USUARIOS
    const users = await fetchUserIds()
    //PEGA OS STATUS DOS USUARIOS
    const userStatus = await Promise.all(users.map((id) => checkStatus(id)))
    
    //VERIFICA SE OS STATUS É ONLINE SE O EMAIL FOI ENVIADO COM SUCESSO
    await Promise.all(
      userStatus.map(async (user) =>{
        if(user.status === "online"){
          //ENVIA EMAIL PARA O USUARIO
          const results = await sendEmail(user.id)
          //VERIFICA SE O EMAIL FOI ENVIADO COM SUCESSO
          if(results){
            //SALVAR OS USUARIOS ONLINE QUE RECEBERAM O EMAIL
            usersSendEmailSuccessfully.push(user.id)
          }
        }
      })
    )
    
    //ALTERA O STATUS DOS USUARIOS QUE RECEBERAM O EMAIL
    setUsers(usersSendEmailSuccessfully)
  };

  /*
    Question 1: 
    Find all online users and send them emails. Render the users for which the emails were successfully sent

    Step 1: Load users
    Step 2: Check users online
    Step 3: Send email for whom are online
    Step 4: Render those which the email was successfully sent
  
  */

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <ul>
            {users.map((user) => (<li>{user}</li>))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
