import React, { useEffect, useState } from "react";
import { UserOutlined, ProductOutlined, BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Flex, Menu } from "antd";
import AdminUser from "../../componet/AdminUser/AdminUser";
import AdminProduct from "../../componet/AdminProduct/AdminProduct";
import boxImage from "./box.png";
import AdminOrder from "../../componet/AdminOrder/AdminOrder";
import AdminProfile from "../../componet/AdminProfile/AdminProfile";
import styles from "./AdminPage.module.css";
// import useSignalR from "../../components/useSignalR/useSignalR";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";
import { InfoCircleOutlined } from '@ant-design/icons';
import apiService from "../../api/api";


const logout = () => {
  console.log("User logged out");
  localStorage.clear();
  window.location.href = "/";
};

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Sản phẩm", "products", <ProductOutlined />),
  getItem("Người dùng", "users", <UserOutlined />),
  getItem("Đơn hàng", "orders", <img src={boxImage} alt="Order" width={14} />),
  getItem("Thông tin", "profile", <InfoCircleOutlined />)
];
const Admin = () => {
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") window.location.href = "/";

  });
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isRead, setIsRead] = useState(true);
  const showMessage = (msg) => {
    setMessage(msg);
    setVisible(false);
    setIsRead(false);
  };
  //useSignalR(showMessage, "admin");
  const handleNewMessage = () => {
    //khi có thông báo mới thì setIsRead(false) để hiện dấu chấm đỏ
    setIsRead(true);
    if (message !== "") {
      setVisible(!visible);
    }
  };

  const [keySelected, setKeySelected] = useState("products");

  const handleOnClick = ({ item, key, keyPath, domEvent }) => {
    setKeySelected(key);
    console.log("key=", key);
  };
  const renderPage = (key) => {
    switch (key) {
      case "users":
        return <AdminUser />;
      case "products":
        return <AdminProduct />;
      case "orders":
        return <AdminOrder />;
      case "profile":
        return <AdminProfile />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Admin</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="notification-icon">
            <Tippy
              interactive={true}
              visible={visible}
              placement="bottom"
              onClickOutside={() => setVisible(false)}
              render={(attrs) => (
                <div className="tooltip-noti" {...attrs}>
                  {message}
                </div>
              )}
            >
              <Badge dot={!isRead} offset={[-10, 10]} onClick={handleNewMessage}>
                <Button ghost shape="circle" icon={<BellOutlined />} />
              </Badge>
            </Tippy>
          </div>
          <Button ghost onClick={() => logout()}
            style={{
              marginLeft: 10,
              marginRight: 40
            }}
          >
            Đăng xuất
          </Button>

        </div>
      </header>
      <div>
        <div className={styles.menuContainer}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[keySelected]}
            style={{ height: "100%" }}
            items={items}
            onClick={handleOnClick}
          />
        </div>
        <div className={styles.content}>
          <div style={{ height: 'calc(100vh - 120px - 40px)', overflowY: 'auto' }}>
            {renderPage(keySelected)}
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
