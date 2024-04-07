import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Nav.scss'
import { useEffect, useState} from 'react';

const Nav = () => {
    const [account, setAccount] = useState();

    useState( () => {
        let session = sessionStorage.getItem("account");
        if(session){
            setAccount(JSON.parse(session));
        }
    } , []) // [] chỉ chạy một lần
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <nav className="nav">
                <NavLink className="nav-link" to="/">Trang chủ</NavLink>
                <NavLink className="nav-link" to="/mgr/product">Sản phẩm</NavLink>
                <NavLink className="nav-link" to="/mgr/employee">Nhân viên</NavLink>
                <NavLink className="nav-link" to="/mgr/order">Quản lý cửa hàng</NavLink>
                
                { 
                    !account && <NavLink className="nav-link" to="/login">đăng nhập</NavLink>
                }

            </nav>
        </div>
        
    );
}

export default Nav;