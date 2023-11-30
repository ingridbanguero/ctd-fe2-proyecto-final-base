import { useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { obtenerNoticias } from "./fakeRest";

/* Principio de Responsabilidad Única (Single Responsibility Principle)
En esta parte uso dicho prinicipio al separar la lógica del formato y cálculo de tiempo en el archivo utils.ts. 
Esto mejora la mantenibilidad y extensibilidad del código, ya que cada función tiene una única responsabilidad, 
facilitando futuros cambios */ 

import { formatearTitulo, calcularTiempoTranscurrido } from "./utils";

import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonLectura,
  BotonSuscribir,
  CotenedorTexto,
} from "./styled";

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => {
        const titulo = formatearTitulo(n.titulo);
        const fechaFormateada = calcularTiempoTranscurrido(n.fecha);

        return {
          id: n.id,
          titulo,
          descripcion: n.descripcion,
          fecha: fechaFormateada,
          esPremium: n.esPremium,
          imagen: n.imagen,
          descripcionCorta: n.descripcion.substring(0, 100),
        };
      });

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
    <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
    <ListaNoticias>
      {noticias.map((n) => (
        <TarjetaNoticia>
          <ImagenTarjetaNoticia src={n.imagen} />
          <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
          <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
          <DescripcionTarjetaNoticia>
            {n.descripcionCorta}
          </DescripcionTarjetaNoticia>
          <BotonLectura onClick={() => setModal(n)}>Ver más</BotonLectura>
        </TarjetaNoticia>
      ))}
      {modal ? (
        modal.esPremium ? (
          <ContenedorModal>
            <TarjetaModal>
              <CloseButton onClick={() => setModal(null)}>
                <img src={Close} alt="close-button" />
              </CloseButton>
              <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
              <CotenedorTexto>
                <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                <DescripcionModal>
                  Suscríbete a nuestro newsletter y recibe noticias de
                  nuestros personajes favoritos.
                </DescripcionModal>
                <BotonSuscribir
                  onClick={() =>
                    setTimeout(() => {
                      alert("Suscripto!");
                      setModal(null);
                    }, 1000)
                  }
                >
                  Suscríbete
                </BotonSuscribir>
              </CotenedorTexto>
            </TarjetaModal>
          </ContenedorModal>
        ) : (
          <ContenedorModal>
            <TarjetaModal>
              <CloseButton onClick={() => setModal(null)}>
                <img src={Close} alt="close-button" />
              </CloseButton>
              <ImagenModal src={modal.imagen} alt="news-image" />
              <CotenedorTexto>
                <TituloModal>{modal.titulo}</TituloModal>
                <DescripcionModal>{modal.descripcion}</DescripcionModal>
              </CotenedorTexto>
            </TarjetaModal>
          </ContenedorModal>
        )
      ) : null}
    </ListaNoticias>
  </ContenedorNoticias>
  );
};

export default Noticias;
