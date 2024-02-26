import Header from "../global/Header";
import Button from "../global/Button";
import Card from "./Card";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/AuthContext";
import CardSkeleton from "./CardSkeleton";
import { getRowOcorrencias } from "../../../functions";
import { linhas } from "../../../themes";

const links = [
  {
    title: "Conta",
    url: "/conta",
  },
];

const Home = () => {
  const { logout } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [ocorrencias, setOcorrencias] = useState(null);

  useEffect(() => {
    async function getStatus() {
      try {
        const res = await fetch("https://api-metro-sp.onrender.com");
        const json = await res.json();
        return json;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async function getOcorrencias() {
      const { data, error } = await getRowOcorrencias(null, null, "lastHour");
      if (error) return Promise.reject(error);
  
      return data;
    }

    Promise.allSettled([getStatus(), getOcorrencias()])
      .then((result) => {
        if (result[0].status === "fulfilled") {
          setStatus(result[0].value);
        } else {
          setStatus(null);
        }

        if (result[1].status === "fulfilled") {
          setOcorrencias(result[1].value);
        } else {
          setOcorrencias(null);
        }
      })
      .finally(() => setLoading(false));
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
      <div
        className="flex flex-1 flex-wrap justify-center gap-7 py-6 pl-5 pr-3 md:mx-auto 
      lg:content-start lg:justify-start lg:px-5 xl:max-w-7xl"
      >
        {loading && skeletons.map((skeleton) => skeleton)}
        {!loading &&
          linhas.map((linha) => {
            return (
              <Card
                key={linha.id}
                id={linha.id}
                title={linha.titulo}
                status={status}
                ocorrencias={ocorrencias}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
