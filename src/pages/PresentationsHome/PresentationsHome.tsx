import NewPresentationModal from "../../components/PresentationsHome/NewPresentationModal/NewPresentationModal.tsx";
import PresentationsList from "../../components/PresentationsHome/PresentationsList/PresentationsList.tsx";
import PresentationIcon from '../../assets/PresentationsLogo.svg'
import styles from "./PresentationsHome.module.css"
const PresentationsHome = () => {
    return (
        <div className={styles.presentationsHome}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={PresentationIcon} alt="Presentation" width={40} height={40}/>
                    <h2>Presentation maker</h2>
                </div>
            </div>
            <div className={styles.wrapper}>
                <NewPresentationModal/>
                <PresentationsList/>
            </div>
        </div>
    );
};

export default PresentationsHome;
