import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../contexts/AuthContext";
import CardSkeleton from "../components/CardSkeleton";

const links = [
  {
    title: "Conta",
    url: "/conta",
  },
];

const Home = () => {
  const { logout } = useContext(userContext);
  const [linhas, setLinhas] = useState(null);

  useEffect(() => {
    fetch("https://api-metro-sp.onrender.com")
      .then((res) => res.json())
      .then((data) => {
        setLinhas(data);
      });
  }, []);

  let skeletons = [];

  for (let i = 0; i < 5; i++) {
    skeletons.push(<CardSkeleton key={i} />);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header links={links}>
        {[
          <Button key={1} onClick={logout}>
            Sair
          </Button>,
        ]}
      </Header>
      <div className="justify-center flex flex-1 flex-wrap gap-7 py-6 pl-5 pr-3 md:mx-auto lg:justify-start lg:px-5 xl:max-w-7xl">
        {linhas
          ? linhas.map((linha) => {
              return (
                <Card
                  key={linha.id}
                  id={linha.id}
                  title={linha.titulo}
                  status={linha.status}
                />
              );
            })
          : skeletons.map((skeleton) => skeleton)}
      </div>
    </div>
  );
};

export default Home;
