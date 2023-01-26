import Wave from '../../assets/Waves/Wave';
import styles from './Footer.module.css';
import Card from '../UI/Cards/Card';

const Footer=()=>{
    return(
        <footer className={styles.footer}>
            <Card className={styles.contactHolder}>
                <h2>Nextstep</h2>
                <h3>Учи бързо, печели бързо</h3>
                <p>Свържете се с нас</p>
                <div className={styles.contactLogos}>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </Card>
            <Card className={styles.contactHolder}>
            <h2>Nextstep</h2>
                <h3>учи бързо, печели бързо</h3>
                <p>Свържете се с нас</p>
                <div className={styles.contactLogos}>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </Card>
            <Card className={styles.contactHolder}>
            <h2>Nextstep</h2>
                <h3>учи бързо, печели бързо</h3>
                <p>Свържете се с нас</p>
                <div className={styles.contactLogos}>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </Card>
            <Wave/>
        </footer>
    )
}

export default Footer;