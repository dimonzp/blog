import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Modal } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import noPhoto from "../../assets/noUser.png";
import Title from "antd/lib/typography/Title";
import { useModal } from "../../hooks/useModal";

const SideBar = ({ email, logout, avatar }) => {
  const [selectedPage, setSelectedPage] = useState("")
  const location = useLocation().pathname;
  const logoutModal = useModal('LOGOUT', logout)

  useEffect(() => {
    switch (location) {
      case '/posts/new':
        setSelectedPage("1")
        break;
      case '/cabinet':
        setSelectedPage("2")
        break;
      default:
        setSelectedPage('')
        break;
    }
  }, [location])

  return (
    <Menu theme="dark" mode="inline" selectedKeys={[selectedPage]}>
      {email ? (
        <Menu.ItemGroup key="g1" title={email}>
          <Menu.Item disabled>
            <Avatar src={avatar ? avatar : noPhoto} />
          </Menu.Item>
          <Menu.Item key="1">
            <Link to={"/posts/new"}>New Post</Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to={"/cabinet"}>My Cabinet</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="" onClick={logoutModal.openModal}>
              Logout
            </Link>
          </Menu.Item>
          <Modal
            {...logoutModal.bind}
          >
            <Title>You realy want to logout?</Title>
          </Modal>
        </Menu.ItemGroup>
      ) : (
        <Menu.ItemGroup key="g2" title={email ? email : "Registrate now"}>
          <Menu.Item key="4">
            <Link to={"/login"}>Login</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to={"/registrate"}>Registrate </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      )}
    </Menu>
  );
};

export default SideBar;
