import { useEffect, useRef } from "react";

const UploadWidgetMultiple = ({ children, onUpload, text,list }) => {
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
                    list.push(result?.info?.url)
                }
                let storage=  sessionStorage.getItem("image_uploaded") == null ? [] : JSON.parse(sessionStorage.getItem("image_uploaded"))
                storage.push(...list);
                sessionStorage.setItem("image_uploaded", JSON.stringify(storage))
                list=[]
            },

            
        );


    }, []);
    return <button onClick={() => widgetRef.current.open()}>{text}</button>;
};
// 
export default UploadWidgetMultiple;
