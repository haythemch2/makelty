import React, { useState, useEffect } from "react";
import * as Lib from "./lib"

export class  RealtimeClientComponent extends React.Component
{
constructor (props)
{
  super(props)
}
static getDerivedStateFromProps(nextProps,prevState)
{
  if (!nextProps.ENDPOINT ||!nextProps.token) 
  {
    return;
  }
  Lib.init(nextProps.ENDPOINT,nextProps.token);
}

subscribe(event,filter ,callback, token , addToList)
{
  return Lib.subscribe(event,filter ,callback, token , addToList)
}
render(){
  return <div></div>
}
}