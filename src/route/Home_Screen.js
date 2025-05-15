import { useState } from 'react';
import Quote from '../components/quote'

function Home() {
    return (
        <div>
            <img src='/ri_double-quotes-l.png'/>
            <Quote />
            <img src='/ri_double-quotes-r.png' />
        </div>
    );
}

export default Home;