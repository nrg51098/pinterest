const printToDom = (selector, domString) => {
  $(selector).html(domString);
};

export default { printToDom };
