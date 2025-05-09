let keys = {
  left: false,
  right: false,
  up: false,
};

export function setKeyState(key, isPressed) {
  if (key in keys) keys[key] = isPressed;
}

export function getKeyState() {
  return keys;
}
