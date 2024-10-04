export function specialInputs(currentInput: string): string | null {
    if (currentInput === "100305 + 101204" || currentInput === "101204 + 100305") {
      return "040323";
    }
    if (currentInput === "119 - 118") {
      return "CPU Anniversary!!!";
    }
    if (currentInput === "333 * 333") {
      return "lucky number!";
    }
    if (currentInput === "11 / 11") {
      return "iloveyouuu!!!";
    }
    if (currentInput === "143 - 1")
        return "imissyou! :(";
    return null;
  }
  