function formatCurrency(amount, currency = "KSH", locale = "en-KE") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export default formatCurrency;
