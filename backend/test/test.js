//1 калькулятор сметы
function calculatePrice(pricePerUnit, area, materialCoeff) {
  return pricePerUnit * area * materialCoeff;
}
test('калькулятор: расчёт стоимости 500 руб/м² × 100м² = 50000 руб', () => {
  expect(calculatePrice(500, 100, 1)).toBe(50000);
});
//2 проверка телефона пустой или нет
function isValidPhone(phone) {
  if (phone === '' || phone === null) return false;
  return true;
}
test('телефон: номер заполнен - валидация проходит', () => {
  expect(isValidPhone('+79991234567')).toBe(true);
});
test('телефон: поле пустое - валидация не проходит', () => {
  expect(isValidPhone('')).toBe(false);
});
//3 проверка имени пустое или нет
function isValidName(name) {
  if (name === '' || name === null) return false;
  return true;
}
test('имя: заполнено - валидация проходит', () => {
  expect(isValidName('Иван')).toBe(true);
});
test('имя: пустое - валидация не проходит', () => {
  expect(isValidName('')).toBe(false);
});
//4 форматирование цены
function formatPrice(price) {
  return price + ' ₽';
}
test('форматирование: к числу добавляется знак рубля', () => {
  expect(formatPrice(50000)).toBe('50000 ₽');
});