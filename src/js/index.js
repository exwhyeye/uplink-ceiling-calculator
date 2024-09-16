$(document).ready(function () {

  const priceTable = {
    '0-0': 1390, // ПВХ белый
    '0-1': 1600, // ПВХ цветной
    '1-0': 2250, // Тканевый белый
    '1-1': 0     // Тканевый цветной
  };

  const cornerPrice = 100;

  /**
   * Функция вычисляет и отображает итоговую стоимость
   */
  function calculatePrice() {
    const area = parseInt($('#area').val());
    const corners = parseInt($('#corners').val());
    const texture = $('#texture').val();
    const color = $('#color').val();

    if (
      isNaN(area) ||
      area < $('#area').attr('min') ||
      area > $('#area').attr('max')
    ) {
      return;
    }
    if (
      isNaN(corners) ||
      corners < $('#corners').attr('min') ||
      corners > $('#corners').attr('max')
    ) {
      return;
    }

    const pricePerM2 = priceTable[`${texture}-${color}`];
    const totalPrice = (pricePerM2 * area) + (cornerPrice * corners);

    $('#totalPrice').text(totalPrice);
  }

  // Обработчик изменения значений инпутов по кнопкам
  $('.custom-input__button').on('click', function () {
    const $input = $(this).siblings('.custom-input__input');
    let currentValue = parseInt($input.val());
    const isIncrease = $(this).hasClass('custom-input__button--increase');

    if (isIncrease) {
      $input.val(currentValue + 1).trigger('input');
    } else if (currentValue > $input.attr('min')) {
      $input.val(currentValue - 1).trigger('input');
    }
  });

  // Обработчик изменения значения фактуры
  $('#texture').on('change', function () {
    const textureValue = $('#texture').val();

    if (textureValue === '1') {
      $('#color option[value="1"]').hide();
      $('#color').val('0');
    } else {
      $('#color option[value="1"]').show();
    }
  });

  // Обработчик изменения значений инпутов и селектов
  $('#area, #corners, #texture, #color').on('input change', function () {
    calculatePrice();
  });

  calculatePrice();
});
