import React, { Component } from 'react'
import { View } from 'react-native'
import MyPresentationalComponent from './MyPresentationalComponent'

export default class AwesomeProject extends Component {
   constructor() {
      super()
      this.state = {
         listItems: []
      }
   }
    /*fecthing API with authorization header*/
    componentWillMount() { 
    return fetch('https://api.shutterstock.com/v2/images/search?per_page=20&query=random&view=full'
      ,{
      headers: {
     'Authorization': 'Basic '+'MzM1MmFlZmZiZDI0ZDMzZjg4NTk6MDk3ZjgzMjI0MmFkMzcxZDlmMDEyNzcwY2FiZGIxZTZjZWJjNDMzYQ==', 
     
   }, 
    }
    )
      .then((response) => response.json())
      .then((responseJson) => {

 this.setState({ listItems: responseJson.data });
    console.log(JSON.stringify(responseJson));

      })
      .catch((error) => {
        console.error(error);
      });
  }
    /*list of items to be embedded in the scroll view*/
   render(){
      return (
         <View>
               {this.state.listItems.length != 0 ? 
            <MyPresentationalComponent
               listItems = {this.state.listItems}               
            />
               : null}
         </View>
      )
   }
}
