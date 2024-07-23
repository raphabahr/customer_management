import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

    * {
        padding: 0;
        font-family: 'inter', sans-serif;
    }

    body {
        width:100vw;
        height: 100vh;
        display:flex;
        justify-content: center;
        background-color: #FFFFFF;
    }

    #root {
        width:100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #F6FAFF
    }

    #id_cliente {
        padding: 0 10px;
        border: 1px solid #bbb;
        border-radius: 5px;
        height: 40px;
        cursor: pointer;
    }
`;

export default Global;