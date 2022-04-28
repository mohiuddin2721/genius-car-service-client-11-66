import { useParams } from 'react-router-dom';
import useServicesDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServicesDetail(serviceId);
    const [user] = useAuthState(auth);


    // const [user, setUser] = useState({
    //     name: 'Shakib All Hasan',
    //     email: 'ahakib@shisir.com',
    //     phone: '01756-453251',
    //     address: 'Mirpur road'
    // });

    // const handleAddressChange = event => {
    //     console.log(event.target.value);
    //     const {address, ...rest} = user;
    //     const newAddress = event.target.value;
    //     const newUser = { address: newAddress, ...rest};
    //     console.log(newAddress, newUser);
    //     setUser(newUser);
    // }

    const handlePlaceOrder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name, 
            serviceId: serviceId,
            address: event.target.address.value, 
            phone: event.target.phone.value
        }
        axios.post('http://localhost:5000/order', order)
        .then(response => {
            // console.log(response);
            const {data} = response;
            if (data?.insertedId) {
                toast('Your data is booked!!')
                event.target.reset();
            }
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" name='name' value={user?.displayName} placeholder='Name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="email" name='email' value={user?.email} placeholder='email' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" name='service' value={service.name} placeholder='service' required readOnly />
                <br />
                <input className='w-100 mb-2' type="text" name='address' autoComplete='off'  placeholder='address' required />
                <br />
                <input className='w-100 mb-2' type="text" name='phone' autoComplete='off' placeholder='Phone' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Please Order" />
            </form>
        </div>
    );
};

export default Checkout;