import styles from './ThemeEditPanel.module.css'
import {useRef, useState} from "react";
import plusIcon from "../../../../../assets/Plus.svg";
import useEditorStore from "../../../../../store/store.ts";

const ThemeEditPanel = () => {
    const initialThemes = [
        { id: 1, image: 'https://img.freepik.com/free-photo/copy-space-green-arrows-pointer_23-2148488417.jpg?t=st=1729128885~exp=1729132485~hmac=d6357524902d04315276658da7342c32888ebf9e1ce8cdca2d57a7848f445ef5&w=1380' },
        { id: 2, image: 'https://img.freepik.com/free-photo/dried-leaves-gray-blank-background_53876-102451.jpg?w=1380&t=st=1729128466~exp=1729129066~hmac=d012e72399864b40f2a11c01ba9e560a454535dbab7936bacc9eee8030ca4992' },
        { id: 3, image: 'https://img.freepik.com/free-photo/colorful-cupboards-design_23-2148518416.jpg?w=1380&t=st=1729128473~exp=1729129073~hmac=2d270eb5b2614452fce6e2f266ed221e36cd3510289a84463778f2ba5df2b0ba' },
        { id: 4, image: 'https://img.freepik.com/free-vector/hand-drawn-abstract-doodle-background_23-2149323527.jpg?w=1380&t=st=1729128482~exp=1729129082~hmac=207e2744ea3122d88449d5c4d1d2f72cf4ac08ec7669473e4a5d0745787bd962' },
        { id: 5, image: 'https://img.freepik.com/free-photo/colorful-background-with-white-circle-blue-flower-it_1340-27442.jpg?t=st=1729129300~exp=1729132900~hmac=0bf3017028ced3aa1e9e9c2b92d2372fcc1044011b0b48faaf6f870ccd6a4c4f&w=1380' },
        { id: 6, image: 'https://img.freepik.com/free-photo/abstract-bluish-paint-background-wallpaper_53876-102504.jpg?w=1380&t=st=1729128544~exp=1729129144~hmac=f96f2823fa3c5c07c0d88c8d8119565041ab11d0a30f64829cb5644f545cdf92' },
        { id: 7, image: 'https://img.freepik.com/free-photo/abstract-paper-background-concept_23-2148812666.jpg?w=1380&t=st=1729128567~exp=1729129167~hmac=070af1cfb791759742dfbe06cc0de8f9cbb9fe8f973e2fa0ce5c8a81963c07bf' },
        { id: 8, image: 'https://img.freepik.com/free-photo/blue-toned-collection-paper-sheets-with-copy-space_23-2148320445.jpg?t=st=1729128912~exp=1729132512~hmac=cd904542aec87781cae8ba5455659d476b733df59770a97079367bead43c6aa0&w=1380' },
        { id: 9, image: 'https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149013358.jpg?w=1380&t=st=1729128626~exp=1729129226~hmac=0fa28208b5cc9dccf0f3e77a43e4e33bc3d2dac73fae5ba9bd364cb4bb7a7ae1' },
        { id: 10, image: 'https://img.freepik.com/free-photo/abstract-paper-background-concept_23-2148812690.jpg?t=st=1729128659~exp=1729132259~hmac=245b31b3fa82b0c9df11c0facb805bc0c39ba880c5b0b268332f09ddec8145b4&w=1380' },
        { id: 11, image: 'https://img.freepik.com/free-photo/pink-toned-cardboard-sheets-with-copy-space_23-2148320487.jpg?t=st=1729128705~exp=1729132305~hmac=6ac53d52b9ce148716bbd0c539548e48df2cd467c3d2a006dee4bc432013fea8&w=1380' },
        { id: 12, image: 'https://img.freepik.com/free-photo/copy-space-yellow-blue-cupboards_23-2148518390.jpg?t=st=1729128775~exp=1729132375~hmac=20df4b61be5241fe05a9e6efc68af7101d21d96e41a7222ea0154a8b0e62f3f0&w=1380' },
        { id: 13, image: 'https://img.freepik.com/free-photo/flat-lay-monochromatic-pattern_23-2148770339.jpg?t=st=1729128813~exp=1729132413~hmac=3bc3569179bc4c388159a7cda79883b1166978ecb12b01ac1a0c1a4affea5973&w=1380' },
        { id: 14, image: 'https://img.freepik.com/free-photo/abstract-2d-colorful-wallpaper-with-grainy-gradients_23-2151001618.jpg?t=st=1729129017~exp=1729132617~hmac=e8b859fe3ce2713494cdced1595cd0088dbfea56601473da9138c5bfdaf3c50a&w=1380' },
        { id: 15, image: 'https://img.freepik.com/free-photo/abstract-green-background_23-2151820863.jpg?t=st=1729129042~exp=1729132642~hmac=47f772d1bcdff4c894297b024b78ce69946e6249944c084770a83b414b58a260&w=1380' },
        { id: 16, image: 'https://img.freepik.com/free-photo/black-white-background_23-2150530990.jpg?t=st=1729129085~exp=1729132685~hmac=de0b33ee43ef7917338c3ef74c36529f007b44233e1df1d1f06cce92c44682e4&w=1380' },
        { id: 17, image: 'https://img.freepik.com/free-photo/green-abstract-background_23-2151820783.jpg?t=st=1729129126~exp=1729132726~hmac=ffbba649703ab020e6485cc0ef0981d4049235f70d2ab807e9f50e4118093f72&w=1380' },
        { id: 18, image: 'https://img.freepik.com/free-photo/black-white-mountain-background_23-2150530981.jpg?t=st=1729129158~exp=1729132758~hmac=8f456ee540fbb97d6fe9ae3f40d8c51077e3f1f0f35bbbaf1f4d2a7c526453f2&w=1380' },
        { id: 19, image: 'https://img.freepik.com/free-photo/eucalyptus-leaves-white-surface-painted-watercolor_1268-27038.jpg?t=st=1729129181~exp=1729132781~hmac=bbdb4a944bbb8c1841bffd5fc42ff723cd11e2ca6f92b930ebc7bf6b9ad0812e&w=1380' },
        { id: 20, image: 'https://img.freepik.com/free-photo/3d-rendering-abstract-black-white-geometric-background_23-2150853539.jpg?t=st=1729129217~exp=1729132817~hmac=d390e221b8017503720ce9c84dc7f685353382725210ddc6f54f056e07fbac97&w=1380' },
    ];
    const {
        selectedPresentationId,
        presentations,
        updateSlideBackground,
    } = useEditorStore();
    const selectedPresentation = presentations.find(p => p.id === selectedPresentationId);
    const [themes, setThemes] = useState(initialThemes);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleThemeSelect = (image: string) => {
        if (!selectedPresentationId) return;
        const allSlidesHaveSelectedTheme = selectedPresentation?.slides.every(slide => slide.backgroundImage === image);
        if (allSlidesHaveSelectedTheme) {
            updateSlideBackground('');
        } else {
            updateSlideBackground(image);
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newTheme = { id: themes.length + 1, image: reader.result as string };
                setThemes([...themes, newTheme]);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className={styles.themeEditWrapper}>
            <p className={styles.themeEditTitle}>Задний фон слайда</p>
            <div className={styles.themeEditScrollWrapper}>
                {themes.map((theme) => {
                    const isSelected = selectedPresentation?.slides.every(slide => slide.backgroundImage === theme.image);
                    return (
                        <div
                            key={theme.id}
                            className={`${styles.themeItem} ${isSelected ? styles.selectedTheme : ''}`}
                            onClick={() => handleThemeSelect(theme.image)}
                        >
                            <img src={theme.image} alt={`Тема ${theme.id}`} className={styles.themeImage} loading="lazy"/>
                        </div>
                    );
                })}
                <div className={styles.themeAddButtonWrapper}>
                    <div className={styles.themeAddButton} onClick={handleButtonClick}>
                        <img src={plusIcon} alt="+" width={30} height={30}/>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                        style={{display: 'none'}}
                        ref={fileInputRef}
                    />
                </div>
                {/*<CustomButton*/}
                {/*    style={{}}*/}
                {/*    onClick={handleButtonClick}*/}
                {/*>*/}
                {/*    Загрузить изображение*/}
                {/*</CustomButton>*/}
                {/*<input*/}
                {/*    type="file"*/}
                {/*    accept="image/*"*/}
                {/*    onChange={handleFileChange}*/}
                {/*    className={styles.fileInput}*/}
                {/*    style={{display: 'none'}}*/}
                {/*    ref={fileInputRef}*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default ThemeEditPanel;