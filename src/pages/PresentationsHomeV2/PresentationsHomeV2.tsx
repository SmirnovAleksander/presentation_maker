import PresentationIcon from '../../assets/PresentationsLogo.svg'
import styles from "./PresentationsHomeV2.module.css"
import NewPresentationModalV2 from "../../components/PresentationsHomeV2/NewPresentationModalV2/NewPresentationModalV2.tsx";
import PresentationsListV2 from "../../components/PresentationsHomeV2/PresentationsListV2/PresentationsListV2.tsx";

const PresentationsHomeV2 = () => {
    return (
        <div className={styles.presentationsHome}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={PresentationIcon} alt="Presentation" width={40} height={40}/>
                    <h2>Presentation maker</h2>
                </div>
            </div>
            <NewPresentationModalV2/>
            <PresentationsListV2/>
        </div>
    );
};

export default PresentationsHomeV2;
