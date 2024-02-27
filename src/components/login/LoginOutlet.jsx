import { Outlet } from "react-router-dom";

const LoginOutlet = () => {
  return (
    <section className="grid h-screen lg:grid-cols-2">
      <div className="flex flex-1 flex-col justify-center px-10 py-5 lg:px-28">
        <Outlet />
        <span className="px-3 pb-3 text-center text-xs text-gray-400 md:p-12 md:text-sm">
          Ao continuar, você concorda com os Termos de Uso e Política de
          Privacidade do vialerta e em receber emails periódicos com
          atualizações.
        </span>
      </div>
      <div className="hidden bg-metro bg-cover bg-center lg:block"></div>
    </section>
  );
};

export default LoginOutlet;
