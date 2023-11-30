export const formatearTitulo = (titulo: string): string => {
    return titulo
      .split(" ").map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }).join(" ");
};
  
export const calcularTiempoTranscurrido = (fecha: Date): string => {
    const ahora = new Date();
    const minutosTranscurridos = Math.floor(
        (ahora.getTime() - fecha.getTime()) / 60000
    );

    return `Hace ${minutosTranscurridos} minutos`;
};