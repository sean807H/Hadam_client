import { useEffect, useState } from 'react';

function Quote() {
    const [quote, setQuote] = useState("");
    useEffect(() => {
        const fetchQuote = async () => {
            const response = await (await fetch(`/todayQuote.json`)).json();
            const randomIndex = Math.floor(Math.random() * response.length);
            setQuote(response[randomIndex].quote);
        }
        fetchQuote();
    }, [])

    return (
        <div>
            <p>{quote}</p>
        </div>
    );
}

export default Quote;