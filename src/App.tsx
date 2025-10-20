import React from "react";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import MainRouter from "./routes";

const App: React.FC = () => {
  return (
      <div className="h-screen">
        <MainRouter />
        <ToastContainer
          limit={1}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          style={{ whiteSpace: 'nowrap', width: 'fit-content' }}
        />
      </div>
  );
};

export default App;
