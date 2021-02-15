import { Carousel, Image } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useHistory } from "react-router-dom";
import noPhoto from "../../../assets/noUser.png";

const contentStyle = {
  height: "80px",
  color: "#fff",
  lineHeight: "60px",
  textAlign: "center",
  background: "#001529",
};
  

const MyCarousel = ({ users }) => {

  const history = useHistory();
  return (
    <Carousel autoplay>
      {users.map((u, id) => {
        return (
          <div key={id} onClick={() => history.push(`/user/${u._id}`)}>
            <h3 style={contentStyle}>
              <Avatar
                size="large"
                src={
                  <Image src={u.avatar ? u.avatar : noPhoto} preview={false} />
                }
              />{" "}
              {u.name}
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
};

export default MyCarousel;
