export const ellipsisText = (text, limit) => {
  return text?.length > limit ? text.substring(0, limit - 3) + '...' : text;
};

export const shade = (color, amt) => {
  let usePound = false;

  if (color[0] === '#') {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);

  let r = (num >> 16) + amt;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  let g = (num & 0x0000ff) + amt;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const getErrorMessage = (error) => {
  const prefix = /\[auth\/([\w|-]*)+\]/;
  return error.replace(prefix, '').trim();
};
