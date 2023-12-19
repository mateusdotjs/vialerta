import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { userContext } from "../../contexts/AuthContext";
import StatusSkeleton from "./StatusSkeleton";
import { linhas, colors } from "../../../themes";
import Report from "../../assets/report.svg?react";
import Stats from "../../assets/stats.svg?react";

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
  const { id } = useParams();
  const { logout } = useContext(userContext);
  const [linha] = linhas.filter((linha) => linha.id == id);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getStatus() {
      try {
        const res = await fetch(
          `https://api-metro-sp.onrender.com/linha/${id}`,
        );
        const data = await res.json();
        setStatus(data);
      } catch (error) {
        setStatus(null);
      } finally {
        setLoading(false);
      }
    }
    getStatus();
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header links={links}>
        {[
          <Button key={1} onClick={logout}>
            Sair
          </Button>,
        ]}
      </Header>
      <div className="flex flex-1 flex-col items-center px-2 pt-10">
        {loading ? (
          <StatusSkeleton />
        ) : (
          <>
            <div className="flex w-full flex-col items-center md:w-80">
              <h1 className="text-xl font-semibold text-gray-950 md:text-2xl">
                Linha {linha.id} - {linha.titulo}
              </h1>
              <div
                style={{ backgroundColor: colors[id] }}
                className="mb-3 h-1 w-5/6 rounded-sm md:w-full"
              ></div>
              <span className="block text-lg font-medium text-gray-950 md:text-xl">
                {status ? status.status : "Dados indisponíveis"}
              </span>
              <span className="mb-5 block text-lg font-normal text-gray-400 md:text-xl">
                Status segundo o Metrô/CPTM
              </span>

              <div className="mb-5 flex items-center gap-3">
                <NavLink
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-amber-400 p-3"
                      : "rounded-md bg-slate-200 p-3 hover:bg-amber-400"
                  }
                  to={`/status/${id}`}
                >
                  <Report />
                </NavLink>
                <NavLink
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-amber-400 p-3"
                      : "rounded-md bg-slate-200 p-3 hover:bg-amber-400"
                  }
                  to={`/status/${id}/stats`}
                >
                  <Stats />
                </NavLink>
              </div>
              <Outlet />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Status;
