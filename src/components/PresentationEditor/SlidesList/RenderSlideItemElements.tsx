import {ElementProps, Slide} from "../../../store/types.ts";

interface RenderSlideItemElementsProps {
    slide: Slide;
    multiplier: number;
}

const RenderSlideItemElements: React.FC<RenderSlideItemElementsProps> = ({slide, multiplier}) => {
    const renderElement = (element: ElementProps) => {
        switch (element.type) {
            case 'text':
                return (
                    <div
                        key={element.id}
                        // className={styles.element}
                        style={{
                            position: 'absolute',
                            left: element.position.x / multiplier,
                            top: element.position.y / multiplier,
                            width: element.size.width / multiplier,
                            height: element.size.height / multiplier,
                            fontSize: element.fontSize / multiplier,
                            color: element.color,
                            textAlign: 'center',
                            transform: `rotate(${element.rotation}deg)`,
                        }}
                    >
                        {element.content}
                    </div>
                );
            case 'image':
                return (
                    <img
                        key={element.id}
                        src={element.content}
                        alt="Image"
                        // className={styles.element}
                        style={{
                            position: 'absolute',
                            left: element.position.x / multiplier,
                            top: element.position.y / multiplier,
                            width: element.size.width / multiplier,
                            height: element.size.height / multiplier,
                            transform: `rotate(${element.rotation}deg)`,
                        }}
                    />
                );
            case 'rectangle':
            case 'circle':
            case 'line':
                return (
                    <div
                        key={element.id}
                        // className={styles.element}
                        style={{
                            position: 'absolute',
                            left: element.position.x / multiplier,
                            top: element.position.y / multiplier,
                            width: element.size.width / multiplier,
                            height: element.size.height / multiplier,
                            backgroundColor: element.color,
                            transform: `rotate(${element.rotation}deg)`,
                            borderRadius: element.type === 'circle' ? '50%' : undefined,
                        }}
                    />
                );
            default:
                return null;
        }
    };
    return (
        <>
            {slide.elements.map(element => renderElement(element))}
        </>
    );
};

export default RenderSlideItemElements;