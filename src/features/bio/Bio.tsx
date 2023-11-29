import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import {
  BioContainer,
  ContenedorBotones,
  BioImagen,
  BioNombre,
  BioDescripcion,
  BioButton
} from "./styled";

const Bio = () => {
  const [bioActive, setBioActive] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
  setBioActive(INFO_SIMPSONS[nombre]);

    const crearBotones = () => {
      return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
        <BioButton
          key={nombre as string}
          onClick={() => onClick(nombre as NombresSimpsons)}
          nameActive={
            bioActive.id === nombre
          }
        >
          {nombre}
        </BioButton>
      ));
    };

  return (
    <BioContainer>
      <ContenedorBotones>{crearBotones()}</ContenedorBotones>
      <div>
        <div>
          <BioImagen
            src={bioActive.image}
            alt={bioActive.nombre}
          />
        </div>
        <div>
          <BioNombre>{bioActive.nombre}</BioNombre>
          <BioDescripcion>{bioActive.descripcion}</BioDescripcion>
        </div>
      </div>
    </BioContainer>
  );
};

export default Bio;
