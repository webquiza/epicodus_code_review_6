import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

function clearFields() {
  $('#base').val('');
  $('#amount').val('');
  $('#target').val('');
}

$(document).ready(function() {
  $('#convert').click(function() {
    const base = $('#base').val();
    const target = $('#target').val();
    const amount = parseFloat($('#amount').val());

    clearFields();
    let promise = CurrencyService.getCurrency(base, target);

    promise.then(function(response) {
      const body = JSON.parse(response);
      const parseConvert = parseFloat(`${body.conversion_rate}`);
      const resultConvert = (`${parseConvert}` * `${amount}`);

      $('.showResult').text(`Your result is ${resultConvert} in ${target}`);
      $('.showResult').val('');
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      $('.showErrors').val('');
    });
  });
});




