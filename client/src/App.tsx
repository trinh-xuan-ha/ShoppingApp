import {ConfigProvider, message} from "antd";
import Routers from "./routers/Routers";
import {Provider} from 'react-redux';
import Store from "./reduxs/store";

message.config({
    top: 30,
    duration: 2,
    maxCount: 3,
    rtl: true,
    prefixCls: 'my-message',
});

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorTextHeading: "#1570EF",
                },
                components: {},
            }}
        >
            <Provider store={Store}>
                <Routers/>
            </Provider>
        </ConfigProvider>
    );
}

export default App;