import { useRouter } from "vue-router";

export function useRequestHandler() {
    const router = useRouter();
    const handleRequest = async (method, form = null,successMsg = null, message, path) => {
        try {
            if (form !== null) await method(form);
            else await method();
            if (successMsg !== null) alert(successMsg);
            if (path) router.push(path);
        } catch (err) {
            alert(err.response?.data?.message || message);
        }
    };

    return { handleRequest };
}