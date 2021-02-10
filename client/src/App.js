import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import HeaderMy from "./components/Header/Header";
import { getMe } from "./store/auth/actions";
import { Layout } from "antd";
import SideBarContainer from "./components/SideBar/SideBarContainer";
import MainContainer from "./components/MainRoute/MainRoute";

const { Header, Content, Footer, Sider } = Layout;

function App(props) {
  const { getMe } = props;
  useEffect(getMe, [getMe]);

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0" >
        <SideBarContainer />
      </Sider>
      <Layout
        style={{
          overflow: "auto",
          minHeight: "80vw",
          width: "100%",
          left: 0,
        }}
      >
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <HeaderMy />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",

            backgroundColor: "#F0F2F5",
          }}
        >
          <MainContainer />
        </Content>
        <Footer
          style={{
            // borderTop: "1px solid #e8e8e8",
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "5%",
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          Developed by dimon.messages@gmail.com
        </Footer>
      </Layout>
    </Layout>
  );
}

export default compose(connect(null, { getMe }))(App);
