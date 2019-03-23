import React from "react";


const List = props => {
      console.log("input sambil tampilkan sedang redering gan ,");
    return (
      <ul>
        {props.item.map(item => (
          <li key={item.id} onClick={props.ClickDeleteGan.bind(this, item.id)}>
            {item.name}
          </li>
        ))}
      </ul>
    );

}


export default List;