import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import ScreenRecorder from './ScreenRecorder';
import {  Trim, TrimVideo } from './trim';


function App() {
 
  return (
    <>
    <ScreenRecorder />
    <Trim />
    </>
  );
}

export default App;