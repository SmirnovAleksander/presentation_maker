import PresentationIcon from '../../assets/PresentationsLogo.svg'
import styles from "./PresentationsHomeV2.module.css"
import NewPresentationModalV2 from "../../components/PresentationsHomeV2/NewPresentationModalV2/NewPresentationModalV2.tsx";
import PresentationsListV2 from "../../components/PresentationsHomeV2/PresentationsListV2/PresentationsListV2.tsx";
import {useBearsStore} from "../../store/zustandStore.ts";
import {Test} from "./Test.tsx";

const PresentationsHomeV2 = () => {
    const bears = useBearsStore((state) => state.bears);
    const increasePopulation = useBearsStore((state) => state.increasePopulation)
    const removePopulation = useBearsStore((state) => state.removeAllBears)
    return (
        <div className={styles.presentationsHome}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={PresentationIcon} alt="Presentation" width={40} height={40}/>
                    <h2>Presentation maker</h2>
                </div>
            </div>
            <NewPresentationModalV2/>
            <h3>{bears}</h3>
            <button onClick={increasePopulation}>+++</button>
            <button onClick={removePopulation}>del</button>
            <Test/>
            <PresentationsListV2/>
        </div>
    );
};

export default PresentationsHomeV2;
