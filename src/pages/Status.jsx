import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { userContext } from "../contexts/AuthContext";
import StatusSkeleton from "../components/StatusSkeleton";
import StatusData from "../components/StatusData";

const links = [
  {
    title: "Home",
    url: "/home",
  },
  {
    title: "Conta",
    url: "/conta",
  },
];

const Status = () => {
  const [linha, setLinha] = useState(null);
  const { id } = useParams();
  const { logout } = useContext(userContext);

  useEffect(() => {
    fetch(`https://api-metro-sp.onrender.com/linha/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLinha(data);
      });
  }, [id]);

  return (
    <>
      <Header links={links}>
        {[
          <Button key={1} onClick={logout}>
            Sair
          </Button>,
        ]}
      </Header>
      <div className="mx-auto flex w-full flex-1 flex-col py-6 pl-5 pr-3 lg:px-5 xl:max-w-7xl">
        {linha ? (
          <StatusData
            id={linha.id}
            title={linha.titulo}
            status={linha.status}
          />
        ) : (
          <StatusSkeleton />
        )}
      </div>
    </>
  );
};

export default Status;
