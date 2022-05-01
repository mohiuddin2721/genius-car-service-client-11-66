import { useEffect, useState } from "react";

const useServicesDetail = serviceId => {
    const [service, setService] = useState({});

    useEffect(() => {
        const url = `https://radiant-fortress-24559.herokuapp.com/service/${serviceId}`;

        fetch(url)
            .then(res => res.json())
            .then(data => setService(data))
    }, [serviceId]);

    return [service];
}

export default useServicesDetail;