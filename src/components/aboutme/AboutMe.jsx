import styles from "./AboutMe.module.css";
import mainStyles from "../../styles/main.module.css";

const AboutMe = () => {
    return (
        <section  className={styles.aboutme}>
            <div className={mainStyles.container}>
                <div className={styles.aboutme__text}>
                    <div className={styles.aboutme__title}>
                        About me
                    </div>
                    <div className={styles.aboutme__desc}>
                        Hi, I'm Denis – UX/UI designer from Minsk. <br/>
                        I'm interested in design and everything connected with it.<br/><br/>

                        I'm studying at courses "Web and mobile design <br/>
                        interfaces" in IT-Academy.<br/><br/>

                        Ready to implement excellent projects<br/>
                        with wonderful people.
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default AboutMe;
