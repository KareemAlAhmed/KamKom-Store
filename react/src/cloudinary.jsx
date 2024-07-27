import { useEffect, useRef } from "react";

const UploadWidget = ({ children, onUpload, text }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dgo3fuaxg",
                uploadPreset: "c0haa4ye",
            },
            function (error, result) {
                if (result?.info?.url) {
                    localStorage.setItem("image_uploaded", result?.info?.url);
                }
            }
        );
    }, []);
    return <button onClick={() => widgetRef.current.open()}>{text}</button>;
};

export default UploadWidget;
