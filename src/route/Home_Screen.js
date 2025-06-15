import Quote from '../components/main/quote'
import styles from "../components/main/main.module.css"
import Best from "../components/main/best"

function Home() {
    return (
        <div className={styles.main_section}>
            <img src='/ri_double-quotes-l.png' className={`${styles.img} ${styles.right}`} />
            <Quote />
            <img src='/ri_double-quotes-r.png' className={`${styles.img} ${styles.left}`} />
            <Best />
        </div>
    );
}

export default Home;