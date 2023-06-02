import {Badge} from "antd";

const CustomComponent = ({status, text}) => {
    let color;
    switch (status) {
        case 1:
            color = "green"
            text  = text ?? "Active"
            break
        case 0:
        default:
            color = "red"
            text  = text ?? "Deactive"
            break
    }

    return (
        <Badge color={color} text={text}/>
    )
}

export default CustomComponent
