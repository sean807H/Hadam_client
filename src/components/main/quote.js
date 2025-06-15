import { useEffect, useState } from 'react';
import styles from "./quote.module.css"

function Quote() {
    const [quote, setQuote] = useState("");
    useEffect(() => {
        const fetchQuote = async () => {
            const response = await (await fetch(`/data/todayQuote.json`)).json();
            const randomIndex = Math.floor(Math.random() * response.length);
            setQuote(response[randomIndex].quote);
        }
        fetchQuote();
    }, [])

    return (
        <div className={styles.quote_box}>
            <p style={{fontSize: "18px", width: "300px", height: "70px", textAlign: "center"}}>{quote}</p>
        </div>
    );
}

export default Quote;