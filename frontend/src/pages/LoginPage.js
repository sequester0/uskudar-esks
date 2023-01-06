import ulogo from "../assets/img/ulogo.png";
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto w-full max-w-md rounded-lg border py-10 px-16 shadow-lg">
          <div className="flex justify-center">
            <img height={150} width={150} src={ulogo} alt="" />
          </div>
          <h1 className="mt-8 mb-12 text-center text-2xl font-medium">e-SKS Giriş Yap</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
