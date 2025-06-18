import Quote from '../components/main/quote'
import styles from "../components/main/main.module.css"
import Best from "../components/main/best"
import Nav from "../components/nav"

function Home() {
    return (
        <div className={styles.main_section}>
            <img src='images/ri_double-quotes-l.png' className={`${styles.img} ${styles.right}`} />
            <Quote />
            <img src='images/ri_double-quotes-r.png' className={`${styles.img} ${styles.left}`} />
            <Best />
            <Nav />
        </div>
    );
}

export default Home;