import axiosClient from "./axiosClient";

const HandleAPI = async (url: string, data?: any, method?: 'post' | 'put' | 'delete') => {
    return await axiosClient(url, {
        method: method ?? 'get',
        data,
    })
}
export default HandleAPI