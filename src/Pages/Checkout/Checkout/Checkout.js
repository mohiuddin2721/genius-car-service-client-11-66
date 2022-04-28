import { useParams } from 'react-router-dom';
import useServicesDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServicesDetail(serviceId);

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: {service.name}</h2>
            <form>
                <input type="text" placeholder='Name' required />
            </form>
        </div>
    );
};

export default Checkout;