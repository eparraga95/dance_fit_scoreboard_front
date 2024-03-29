import styled from "styled-components";
import { shade } from "polished";

interface ButtonProps {
  vanilla?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  padding: 0.3rem 0.6rem;
  margin: 0.2rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  min-width: auto;

  border-radius: 0.3rem;
  border-style: solid;
  border-color: #ffc107;

  color: ${(props) =>
    props.vanilla
      ? shade(0.5, "#ffc107")
      : "#ffc107"}; // Black text for "update" actionType, white text otherwise
  background-color: ${(props) =>
    props.vanilla
      ? "#ffc107"
      : shade(
          0.5,
          "#ffc107",
        )}; // Yellow background for "update" actionType, light gray otherwise

  &:hover {
    background-color: ${(props) =>
      props.vanilla
        ? shade(0.1, "#ffc107")
        : shade(
            0.6,
            "#ffc107",
          )}; // Darken yellow for "update" on hover, light gray otherwise
  }

  &:active {
    background-color: ${(props) =>
      props.vanilla
        ? shade(0.3, "#ffc107")
        : shade(
            0.7,
            "#ffc107",
          )}; // Darken yellow for "update" on active, light gray otherwise
  }

  &:disabled {
    background-color: ${(props) =>
      props.vanilla
        ? shade(-0.3, "#ffc107")
        : shade(
            -0.3,
            "#ffc107",
          )}; // Lighten yellow for "update" when disabled, light gray otherwise
  }
`;
