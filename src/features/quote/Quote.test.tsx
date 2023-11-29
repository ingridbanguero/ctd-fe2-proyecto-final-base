import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor } from "@testing-library/react";
import Cita from "./Cita";
import { API_URL } from "../../app/constants";
import { render } from "../../test-utils"
import userEvent from "@testing-library/user-event";

const dataArray = [
    {
        "quote": "Eat my shorts",
        "character": "Bart Simpson",
        "image": "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FBartSimpson.png?1497567511638",
        "characterDirection": "Right"
      }
];

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.json(dataArray), ctx.status(200), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Cita", () => {
  
  it("No deberia mostrar ninguna cita", async () => {
    render(<Cita />);
    expect(
      screen.getByText(/No se encontro ninguna cita/i)
    ).toBeInTheDocument();
  });

  it("Deberia mostrar el texto de cargando", async () => {
    render(<Cita />);
    const btnBuscar = await screen.findByLabelText(/Obtener Cita/i);
    userEvent.click(btnBuscar);
    await waitFor(() => {
      expect(screen.getByText(/cargando/i)).toBeInTheDocument();
    });
  });

  it("Deberia mostrar la cita del personaje", async () => {
    render(<Cita />);
    const input = screen.getByRole("textbox", { name: "Author Cita" });
    const btnBuscar = await screen.findByLabelText(/Obtener cita aleatoria/i);
    await userEvent.click(input);
    await userEvent.keyboard("bart");
    await userEvent.click(btnBuscar);
    await waitFor(() => {
      expect(
        screen.getByText(/Eat my shorts/i)
      ).toBeInTheDocument();
    }, { timeout: 500 });
  });

  it("Deberia mostrar error", async () => {
    render(<Cita />);
    const input = screen.getByRole("textbox", { name: "Author Cita" });
    const btnBuscar = await screen.findByLabelText(/Obtener cita aleatoria/i);
    await userEvent.click(input);
    await userEvent.clear(input);
    userEvent.click(btnBuscar);
    await waitFor(() => {
      expect(
        screen.getByText(/No se encontro ninguna cita/i)
      ).toBeInTheDocument();
    });
  });
});