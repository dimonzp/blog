import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";

const Header = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const location = useLocation().pathname;
  useEffect(() => {
    switch (location) {
      case "/":
        setSelectedPage("1");
        break;
      case "/posts":
        setSelectedPage("1");
        break;

      case "/users":
        setSelectedPage("2");
        break;

      default:
        setSelectedPage("");
        break;
    }
  }, [location]);

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[selectedPage]}>
      <Menu.Item key="1">
        <Link to={"/posts"}>Posts</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={"/users"}>Users</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
