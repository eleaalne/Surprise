import NavBar from "./NavBar";
import { useState } from "react";

function Page() {
  const [mensajeVisible, setMensajeVisible] = useState(true);

  return (
    <div>
      <NavBar onLinkClick={() => setMensajeVisible(false)} />
      
      {mensajeVisible && (
        <div style={{
          textAlign: 'center',
          marginTop: '50px',
          fontSize: '28px',
          fontWeight: 'bold',
          color: 'black'
        }}>
            Hola mi amorrrr <br />
            I hope you like your surprise <br />
            te amo mi corazón de melón
        </div>
      )}
    </div>
  );
}

export default Page;
