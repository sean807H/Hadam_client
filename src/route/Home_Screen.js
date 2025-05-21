import { useState } from 'react';
import Quote from '../components/quote'
import Slider from "../components/best/best"

function Home() {
    return (
        <div>
            <img src='/ri_double-quotes-l.png'/>
            <Quote />
            <Slider />
            <img src='/ri_double-quotes-r.png' />
        </div>
    );
}

export default Home;