import PresentationIcon from '../../assets/PresentationsLogo.svg'
import styles from "./PresentationsHomeV2.module.css"
import NewPresentationModalV2 from "../../components/PresentationsHomeV2/NewPresentationModalV2/NewPresentationModalV2.tsx";
import PresentationsListV2 from "../../components/PresentationsHomeV2/PresentationsListV2/PresentationsListV2.tsx";
import CustomButton from "../../components/UI/CustomButton/CustomButton.tsx";

const PresentationsHomeV2 = () => {
    const handleReset = () => {
        localStorage.clear();
        window.location.reload();
    };
    return (
        <div className={styles.presentationsHome}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={PresentationIcon} alt="Presentation" width={40} height={40}/>
                    <h2>Presentation maker</h2>
                </div>
            </div>
            <NewPresentationModalV2/>
            <CustomButton onClick={() => handleReset()} style={{position: 'absolute', left: '10px', bottom: '10px'}}>Reset store</CustomButton>
            <PresentationsListV2/>
        </div>
    );
};

export default PresentationsHomeV2;
