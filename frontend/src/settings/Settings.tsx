import React, {useState} from 'react';



function Settings(props) {

    const [colorText, setColorText] = useState<string>("")
    //
    return (
        <div style={{color: colorText}}>abc</div>

    );
}

export default Settings;