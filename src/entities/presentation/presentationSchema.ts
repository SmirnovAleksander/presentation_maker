const presentationSchema = {
    type: "object",
    properties: {
        id: { type: "number" },
        title: { type: "string" },
        slides: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    elements: {
                        type: "array",
                        items: {
                            type: "object",
                            oneOf: [
                                {
                                    type: "object",
                                    properties: {
                                        id: { type: "number" },
                                        type: { type: "string", enum: ["text"] },
                                        content: { type: "string" },
                                        position: {
                                            type: "object",
                                            properties: {
                                                x: { type: "number", minimum: 0, maximum: 1200 },
                                                y: { type: "number", minimum: 0, maximum: 672 }
                                            },
                                            required: ["x", "y"]
                                        },
                                        size: {
                                            type: "object",
                                            properties: {
                                                width: { type: "number" },
                                                height: { type: "number" }
                                            },
                                            required: ["width", "height"]
                                        },
                                        fontSize: { type: "number" },
                                        fontFamily: { type: "string" },
                                        color: { type: "string" },
                                        rotation: { type: "number" },
                                        backgroundColor: { type: "string" },
                                        bold: { type: "boolean" },
                                        italic: { type: "boolean" },
                                        underline: { type: "boolean" },
                                        strikethrough: { type: "boolean" },
                                        textTransform: { type: "string", enum: ["none", "uppercase"] },
                                        alignment: { type: "string", enum: ["left", "center", "right", "justify"] },
                                        zIndex: { type: "number" }
                                    },
                                    required: ["id", "type", "content", "position", "size", "fontSize", "fontFamily", "color", "rotation"]
                                },
                                {
                                    type: "object",
                                    properties: {
                                        id: { type: "number" },
                                        type: { type: "string", enum: ["image"] },
                                        content: { type: "string" },
                                        position: {
                                            type: "object",
                                            properties: {
                                                x: { type: "number", minimum: 0, maximum: 1200 },
                                                y: { type: "number", minimum: 0, maximum: 672 }
                                            },
                                            required: ["x", "y"]
                                        },
                                        size: {
                                            type: "object",
                                            properties: {
                                                width: { type: "number" },
                                                height: { type: "number" }
                                            },
                                            required: ["width", "height"]
                                        },
                                        rotation: { type: "number" },
                                        borderColor: { type: "string" },
                                        borderStyle: { type: "string", enum: ["solid", "dashed", "dotted", "none"] },
                                        borderWidth: { type: "number" },
                                        borderRadius: { type: "number" },
                                        boxShadow: { type: "string" },
                                        opacity: { type: "number" },
                                        zIndex: { type: "number" }
                                    },
                                    required: ["id", "type", "content", "position", "size", "rotation"]
                                },
                                {
                                    type: "object",
                                    properties: {
                                        id: { type: "number" },
                                        type: { type: "string", enum: ["rectangle", "circle", "line"] },
                                        position: {
                                            type: "object",
                                            properties: {
                                                x: { type: "number", minimum: 0, maximum: 1200 },
                                                y: { type: "number", minimum: 0, maximum: 672 }
                                            },
                                            required: ["x", "y"]
                                        },
                                        size: {
                                            type: "object",
                                            properties: {
                                                width: { type: "number" },
                                                height: { type: "number" }
                                            },
                                            required: ["width", "height"]
                                        },
                                        color: { type: "string" },
                                        rotation: { type: "number" },
                                        lineWidth: { type: "number" },
                                        borderRadius: { type: "number" },
                                        opacity: { type: "number" },
                                        boxShadow: { type: "string" },
                                        borderColor: { type: "string" },
                                        borderStyle: { type: "string", enum: ["solid", "dashed", "dotted"] },
                                        borderWidth: { type: "number" },
                                        gradient: { type: "string" },
                                        fillType: { type: "string", enum: ["solid", "gradient"] },
                                        zIndex: { type: "number" }
                                    },
                                    required: ["id", "type", "position", "size", "color", "rotation"]
                                }
                            ]
                        }
                    },
                    backgroundColor: { type: "string" },
                    backgroundImage: { type: "string" }
                },
                required: ["id", "elements", "backgroundColor"]
            }
        }
    },
    required: ["id", "title", "slides"]
};

export default presentationSchema;
