// Trong file Home.js
import{ useEffect, useState  } from 'react';
import { useHistory } from 'react-router-dom';
import useCheckLogin from '../../utils/checkLogin';
import { homePage } from '../../services/userService';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import {getReportSalesWeek} from '../../services/managerService'
import '../style.scss';
import './Home.scss';
import ChartSales from './ChartSales'
import { Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Home = () => {
    const history = useHistory();
    const [weeklySalesData, setWeeklySalesData] = useState(null);
    useCheckLogin();

    useEffect(() => {
        const fetchData = async () => {
            let response = await getReportSalesWeek();
            if( response && response.Success === true) {
                console.log("Check Response Home Page >>>>> ", response.Sales)
                setWeeklySalesData(response.Sales);
            } else {
                toast.error(response.Mess)
            }
        }
        fetchData();
    }, [history]);

    return (
        <div className='backgroud'>
            <div className='container'>
                <div className='form-report '>
                    <NavLink to='/mgr/report' className='nav-link' >
                        <h4 className=''>Doanh thu tuần</h4>
                        <div>
                            <ChartSales data={weeklySalesData} />
                        </div>
                    </NavLink>
                </div>
                
            </div>
        </div>
    )
}

export default Home;
