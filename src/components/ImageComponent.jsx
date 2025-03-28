import React, {useState, useEffect} from 'react';
import {Image} from "react-bootstrap";

const ImageComponent = ({style, img}) => {
    return (
        <div>
            {img ? <img src={`data:image/jpeg;base64,${img}`}  alt="Img" style={style}/> : <div style={style} className={"text-center"}> No Image Yet</div>}
        </div>
    );
};

export default ImageComponent;