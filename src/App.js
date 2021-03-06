import React, { useState, useEffect } from "react";
import './main.css'

const subStrButton={
  marginLeft: "20px"
}
const linkStyle={
  color: "green",
  fontWeight: "bold",
  textDecoration: "none"

}

function App() {
 const [arrayData, setArrayData] = useState([]);
 const [inputValue, setInputValue] = useState("");
 const [currentArr, setcurrentArr] = useState(arrayData);
 const [checked, setChecked] = useState(true);

 useEffect(()=>{  
  fetch('https://cors-anywhere.herokuapp.com/https://www.mrsoft.by/data.json')
  .then(response=> response.json())
  .then(arrData=>{
    setArrayData(arrData.data);
  })
 },[])

 function OutputDependingOnLength(){
if(Number.isInteger(Number(inputValue))){
  setcurrentArr( arrayData.filter((item)=>{
    if(item.length>inputValue) return <div>{item}</div>
  }))
} else {alert("Enter the length string")}
}

function OutputDependingOnSubStr(){
  if(Number.isInteger(Number(inputValue))){
    alert("Enter the desired substring")
  }
  if(typeof inputValue === "string" ){
      if(!checked){
        const strUpper= inputValue.toLocaleUpperCase();
        const strLower= inputValue.toLowerCase();
        setcurrentArr(arrayData.filter((item)=>{
        if(item.indexOf(strUpper) > -1 || item.indexOf(strLower) > -1) return item
      })) 
      } else { 
        setcurrentArr(arrayData.filter((item)=>{
        if(item.indexOf(inputValue) > -1) return item
     })) 
    }
  }
}

function  changeCheckValue(){
  setChecked(!checked)   
}

function changeInputValue(oEvent){
  setInputValue(oEvent.target.value)
}
  return (
    <div className="App">
      <div>
      <p><strong>For work with data, connect to the public proxy server using the link: </strong><a style={linkStyle} href="https://cors-anywhere.herokuapp.com/corsdemo">СONNECT PROXY SERVER</a></p>
    </div>
    <div className="inputsContainer">
    <input type="text" value = {inputValue} onChange={changeInputValue}></input>
    <input type="checkbox"  defaultChecked={checked} onChange={changeCheckValue}></input>
    </div>
    <div className="buttonsContainer">
    <button  onClick={OutputDependingOnLength}>WordLength</button>
    <button onClick={OutputDependingOnSubStr} style={subStrButton}>SubString</button>
    </div>
    <textarea  rows="20" cols="70" value={currentArr}></textarea>
    </div>
  );
}

export default App;
